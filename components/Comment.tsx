import dayjs from "dayjs";
import { FC } from "react";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime as any);

type Props = {
  username: string;
  commentText: string;
  dateISOString: string;
};

export const Comment: FC<Props> = ({
  username,
  commentText,
  dateISOString,
}) => {
  return (
    <div className="d-flex my-2" style={{ fontSize: "0.8rem" }}>
      <span className="text-secondary">@{username} </span> &nbsp; {commentText}
      <span className="text-secondary ms-2">
        - {dayjs().to(dayjs(dateISOString))}
      </span>
    </div>
  );
};
