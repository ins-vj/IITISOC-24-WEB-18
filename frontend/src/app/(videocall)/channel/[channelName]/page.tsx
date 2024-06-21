import { error } from "console";
import dynamic from "next/dynamic";

const Call = dynamic(() => import("@/components/Call/Call"), {
  ssr: false,
});

export default function Page({ params }: { params: { channelName: string } }) {
  let agoraID = process.env.AGORA_APP_ID;
  if (agoraID) {
  } else {
    agoraID = "";
    error("Agora ID not found");
  }
  return (
    <main className="flex w-full flex-col">
      <p className="absolute left-8 top-8 text-2xl font-bold text-gray-900">
        {params.channelName!}
      </p>
      <Call appId={agoraID} channelName={params.channelName}></Call>
    </main>
  );
}
