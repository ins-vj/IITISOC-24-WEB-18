"use client";

import { Button, Tooltip, Select, SelectItem, Chip } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useState, useEffect } from 'react';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import React from "react";
import { DateInput } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { today } from "@internationalized/date";
import Shine from './shine'
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import HelpIcon from '@mui/icons-material/Help';
import Cards from "@/components/dashboard/room/cards";
import { fetchFriendRequests, createCustomMeeting } from "@/helpers/api";

export default function JoinRoom() {
    const [isPrivate, setIsPrivate] = useState(true);
    const [value, setValue] = useState(parseZonedDateTime(`${now(getLocalTimeZone())}`));
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [date, setDate] = useState(`${now(getLocalTimeZone()).toString().substring(0, 10)}`);
    const [time, setTime] = useState(`${now(getLocalTimeZone()).toString().substring(11, 16)}`);
    const [zone, setZone] = useState(`${now(getLocalTimeZone()).offset.toString()}`);

    useEffect(() => {
        async function loadFriendRequests() {
            try {
                const data = await fetchFriendRequests();
                const acceptedFriends = data.filter(friend => friend.currentStatus === "accepted");
                setFriendsList(acceptedFriends);
            } catch (error) {
                console.error("Failed to fetch friend requests:", error);
            }
        }

        loadFriendRequests();
    }, []);

    function handleFriendSelection(friend) {
        setSelectedFriends(prev => {
            if (prev.includes(friend.from_user.id)) {
                return prev.filter(id => id !== friend.from_user.id);
            } else {
                return [...prev, friend.from_user.id];
            }
        });
    }

    function valueHandler(value) {
        setValue(value);
        if (value) {
            setDate(value.toString().substring(0, 10));
            setTime(value.toString().substring(11, 16));
            // Properly format the time zone offset
            const offset = value.offset.toString();
            const hours = offset.slice(0, 3);
            const minutes = offset.slice(3);
            const formattedZone = `${hours}:${minutes}`;
            setZone(formattedZone);
        }
    }

    function formatDateTime(date, time, zone) {
        // Combine the date, time, and zone into a valid ISO 8601 string
        const dateTimeString = `${date}T${time}:00${zone}`;
        const dateTime = new Date(dateTimeString);
        return dateTime.toISOString();
    }

    return (
        <Cards>
            <div className="flex flex-row gap-[10px] w-[100%] justify-between">
                <Button onClick={() => {
                    if (selectedFriends.length > 0) {
                        try {
                            const formattedDateTime = formatDateTime(date, time, zone);
                            console.log(selectedFriends, isPrivate, formattedDateTime);
                            createCustomMeeting(selectedFriends, isPrivate, formattedDateTime);
                        } catch (error) {
                            toast.error("Invalid date or time format");
                        }
                    } else {
                        toast.error("Please select a friend to start a meeting");
                    }
                }} color="secondary" size="lg" startContent={<SettingsSuggestIcon fontSize='small' />} radius="full" variant="solid" className="text-white">
                    Create Custom Room
                </Button>
            </div>

            <DatePicker
                label="Event Date"
                variant="bordered"
                granularity="minute"
                shouldForceLeadingZeros={false}
                minValue={now(getLocalTimeZone())}
                hourCycle={12}
                showMonthAndYearPickers
                defaultValue={now(getLocalTimeZone())}
                onChange={valueHandler}
            />

            <div className="flex items-center w-[100%] justify-between">
                <div className="relative min-w-[215px] max-w-[215px] h-[2.75rem] flex justify-between items-center rounded-xl border-[2px] border-default-200 p-[3px]">
                    <div className="absolute -z-10 flex items-center justify-center h-[calc(100%-6px)] bg-purple-800 rounded-lg w-[calc(50%-5px)] transition-left duration-200" style={{ left: isPrivate ? "3px" : "107.5px" }}></div>
                    <div onClick={() => setIsPrivate(true)} className="flex items-center justify-center h-[100%] rounded-lg w-[calc(50%-1.5px)] text-white" style={{ opacity: isPrivate ? "1" : "0.6" }}>
                        <SecurityIcon />
                        <span>Private</span>
                    </div>
                    <div onClick={() => setIsPrivate(false)} className="flex items-center justify-center h-[100%] rounded-lg w-[calc(50%-1.5px)] text-white" style={{ opacity: !isPrivate ? "1" : "0.6" }}>
                        <PublicIcon />
                        <span>Public</span>
                    </div>
                </div>

                <Tooltip offset={30} content="In Public rooms, users cannot freely share any video or audio" placement="bottom-end" className="text-white w-[400px]" color="secondary">
                    <HelpIcon fontSize='small' color='secondary' />
                </Tooltip>
            </div>

            <div className="w-[100%] text-default-500">Invite Friends</div>

            <Select
                color="primary"
                items={friendsList}
                variant="bordered"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Select a user"
                classNames={{ base: "w-[100%]", trigger: "min-h-12 py-2" }}
                renderValue={(items) => (
                    <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                            <Chip key={item.key}>{item.data?.from_user.username}</Chip>
                        ))}
                    </div>
                )}
            >
                {friend => (
                    <SelectItem
                        key={friend.id}
                        textValue={friend.from_user.username}
                        className="list"
                        onClick={() => handleFriendSelection(friend)}
                    >
                        <div className="flex items-center">
                            <span className="text-small text-customtextblack-500">
                                {friend.from_user.username}
                            </span>
                        </div>
                    </SelectItem>
                )}
            </Select>

            <div className="w-[100%] flex gap-[18px] items-center">
                <UpcomingIcon fontSize='small' color='secondary' />
                <div className="text-default-500 text-sm text-justify">
                    Friends will be notified about the upcoming meeting scheduled on {date} at {time} {zone}
                </div>
            </div>
        </Cards>
    );
}
