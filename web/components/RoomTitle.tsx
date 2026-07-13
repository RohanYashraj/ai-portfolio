import styles from "./RoomTitle.module.css";

type Props = {
  title: string;
  subtitle?: string;
  /* h2 within the scrolling gallery page; h1 when the room IS the page */
  as?: "h1" | "h2";
};

/* Room name in display serif + one-line placard subtitle */
export function RoomTitle({ title, subtitle, as: Heading = "h2" }: Props) {
  return (
    <div className={styles.roomTitle}>
      <Heading className={styles.title}>{title}</Heading>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
