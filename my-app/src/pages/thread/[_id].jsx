import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const ThreadPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const _id = router.query._id;
  console.log("router1", _id);

  if (session) {
    return (
      <div className="w-full min-h-full flex justify-center">
        <div className="min-h-screen p-5 w-full md:max-w-7xl flex flex-col gap-5">test</div>
      </div>
    );
  }
};

export default ThreadPage;
