import { ClockIcon } from "@radix-ui/react-icons";
export default function CreatedAt({ createdAt }: { createdAt: string }) {
  return (
    <>
      <ClockIcon />
      <time dateTime={createdAt} className="text-gray-500">
        {createdAt}
      </time>
    </>
  );
}
