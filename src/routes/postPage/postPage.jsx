import "./postPage.css";
import Image from "../../components/image/image";
import PostInteractions from "../../components/postInteractions/postInteractions";
import { Link, useNavigate, useParams } from "react-router";
import Comments from "../../components/comments/comments";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const PostPageSkeleton = () => {
  return (
    <div className="postPage">
      <div className="postBackSkeleton skeletonBlock"></div>
      <div className="postContainer postSkeletonContainer">
        <div className="postImgSkeleton skeletonBlock"></div>
        <div className="postDetails postDetailsSkeleton">
          <div className="postActionsSkeleton">
            <span className="skeletonCircle skeletonBlock"></span>
            <span className="skeletonCircle skeletonBlock"></span>
            <span className="skeletonButton skeletonBlock"></span>
          </div>
          <div className="skeletonLine skeletonTitle skeletonBlock"></div>
          <div className="skeletonLine skeletonBlock"></div>
          <div className="skeletonLine skeletonShort skeletonBlock"></div>
          <div className="postUserSkeleton">
            <span className="skeletonAvatar skeletonBlock"></span>
            <span className="skeletonLine skeletonUserName skeletonBlock"></span>
          </div>
          <div className="commentSkeletonList">
            <span className="skeletonLine skeletonBlock"></span>
            <span className="skeletonLine skeletonBlock"></span>
            <span className="skeletonLine skeletonShort skeletonBlock"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data),
  });

  if (isPending) return <PostPageSkeleton />;

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "Pin not found!";

  return (
    <div className="postPage">
      <button
        className="postBackButton"
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <svg height="20" viewBox="0 0 24 24" width="20">
          <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
        </svg>
      </button>
      <div className="postContainer">
        <div className="postImg">
          <Image src={data.media} alt={data.title || ""} w={640} />
        </div>
        <div className="postDetails">
          <PostInteractions postId={id} />
          <div className="postCopy">
            {data.title && <h1>{data.title}</h1>}
            {data.description && <p>{data.description}</p>}
            {data.link && (
              <a href={data.link} target="_blank" rel="noreferrer">
                {data.link}
              </a>
            )}
          </div>
          <Link to={`/${data.user.username}`} className="postUser">
            <Image src={data.user.img || "/general/noAvatar.png"} />
            <div>
              <span>{data.user.displayName}</span>
              <small>@{data.user.username}</small>
            </div>
          </Link>
          <Comments id={data._id} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
