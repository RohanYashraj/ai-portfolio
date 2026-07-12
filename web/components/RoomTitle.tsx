import styles from "./RoomTitle.module.css";

type Props = {
  title: string;
  subtitle?: string;
};

/* Room name in display serif + one-line placard subtitle */
export function RoomTitle({ title, subtitle }: Props) {
  return (
    <div className={styles.roomTitle}>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
