import "./profilePage.css";
import Image from "../../components/image/image";
import { useState } from "react";
import Gallery from "../../components/gallery/gallery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import apiRequest from "../../utils/apiRequest";
import Boards from "../../components/boards/boards";
import FollowButton from "./FollowButton";

const ProfileSkeleton = () => {
  return (
    <div className="profilePage">
      <section className="profileHero profileSkeletonHero">
        <div className="profileImgSkeleton profileSkeletonBlock"></div>
        <div className="profileLine profileNameSkeleton profileSkeletonBlock"></div>
        <div className="profileLine profileUsernameSkeleton profileSkeletonBlock"></div>
        <div className="profileLine profileCountSkeleton profileSkeletonBlock"></div>
        <div className="profileActionSkeleton">
          <span className="profileIconSkeleton profileSkeletonBlock"></span>
          <span className="profileButtonSkeleton profileSkeletonBlock"></span>
          <span className="profileButtonSkeleton profileSkeletonBlock"></span>
          <span className="profileIconSkeleton profileSkeletonBlock"></span>
        </div>
      </section>
      <div className="profileTabsSkeleton">
        <span className="profileTabSkeleton profileSkeletonBlock"></span>
        <span className="profileTabSkeleton profileSkeletonBlock"></span>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [type, setType] = useState("saved");

  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return <ProfileSkeleton />;

  if (error) {
    return (
      <div className="profileState">
        <h1>Profile unavailable</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="profileState">
        <h1>User not found</h1>
        <p>This profile does not exist or may have been removed.</p>
      </div>
    );
  }

  return (
    <div className="profilePage">
      <section className="profileHero">
        <div className="profileCover"></div>
        <Image
          className="profileImg"
          w={128}
          h={128}
          src={data.img || "/general/noAvatar.png"}
          alt=""
        />
        <h1 className="profileName">{data.displayName}</h1>
        <span className="profileUsername">@{data.username}</span>
        <div className="followCounts">
          <strong>{data.followerCount}</strong> followers
          <span></span>
          <strong>{data.followingCount}</strong> following
        </div>
        <div className="profileInteractions">
          <button className="profileIconButton" type="button" aria-label="Share profile">
            <Image path="/general/share.svg" alt="" />
          </button>
          <div className="profileButtons">
            <button type="button">Message</button>
            <FollowButton
              isFollowing={data.isFollowing}
              username={data.username}
            />
          </div>
          <button className="profileIconButton" type="button" aria-label="More options">
            <Image path="/general/more.svg" alt="" />
          </button>
        </div>
      </section>

      <div className="profileOptions" role="tablist" aria-label="Profile content">
        <button
          type="button"
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
          aria-selected={type === "created"}
        >
          Created
        </button>
        <button
          type="button"
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
          aria-selected={type === "saved"}
        >
          Saved
        </button>
      </div>

      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

export default ProfilePage;
