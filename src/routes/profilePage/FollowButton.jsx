import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { useToast } from "../../components/toast/toast";

const followUser = async (username) => {
  const res = await apiRequest.post(`/users/follow/${username}`);
  return res.data;
};

const FollowButton = ({ isFollowing, username }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
      toast.success(
        isFollowing ? "Unfollowed" : "Following",
        isFollowing ? `You unfollowed @${username}.` : `You are now following @${username}.`
      );
    },
    onError: (err) => {
      toast.error(
        "Could not update follow",
        err.response?.data?.message || "Please try again."
      );
    },
  });

  return (
    <button
      onClick={() => mutation.mutate(username)}
      disabled={mutation.isPending}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
