import React from "react";
import { Button, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const commentSchema = z.object({
  comment: z.string().min(10, "Comment must be at least 10 characters long"),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  onCancel: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Textarea
        label="Comment"
        placeholder="Enter your rationale here..."
        {...register("comment")}
        errorMessage={errors.comment?.message}
        isInvalid={!!errors.comment}
      />
      <div className="flex gap-2 justify-end">
        <Button color="danger" variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          disabled={!isValid}
          className="bg-[#8B0000] text-white"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
