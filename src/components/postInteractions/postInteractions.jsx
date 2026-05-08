import "./postInteractions.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { useToast } from "../toast/toast";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FavouriteIcon,
  MoreHorizontalIcon,
  Share01Icon,
} from "@hugeicons/core-free-icons";

const interact = async (id, type) => {
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });

  return res.data;
};

const PostInteractions = ({ postId }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["interactionCheck", postId] });
      toast.success(
        variables.type === "save" ? "Pin updated" : "Reaction updated",
        variables.type === "save" ? "Your saved pins were updated." : "Your like was updated."
      );
    },
    onError: (err) => {
      toast.error(
        "Action failed",
        err.response?.data?.message || "Please try again."
      );
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["interactionCheck", postId],
    queryFn: () =>
      apiRequest
        .get(`/pins/interaction-check/${postId}`)
        .then((res) => res.data),
  });

  if (isPending || error) return;

  return (
    <div className="postInteractions">
      <div className="interactionIcons">
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={22}
          primaryColor={data.isLiked ? "#e50829" : "#000000"}
          onClick={() => mutation.mutate({ id: postId, type: "like" })}
          aria-label={data.isLiked ? "Unlike pin" : "Like pin"}
        />
        {data.likeCount}
        <HugeiconsIcon icon={Share01Icon} size={22} aria-label="Share pin" />
        <HugeiconsIcon
          icon={MoreHorizontalIcon}
          size={22}
          aria-label="More options"
        />
      </div>
      <button
        disabled={mutation.isPending}
        onClick={() => mutation.mutate({ id: postId, type: "save" })}
      >
        {data.isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default PostInteractions;
