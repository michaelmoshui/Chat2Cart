import { useRef } from "react";
import useClickOutside from "../../helper/clickOutside";
import styles from "./ItemDescription.module.css";

export default function ItemDescription({
  item,
  showItemDescription,
  setShowItemDescription,
  ind,
  iniBooleans,
}) {
  const itemLoc = useRef(null);
  useClickOutside(itemLoc, () => {
    setShowItemDescription(iniBooleans);
  });

  return (
    <div>
      {showItemDescription && (
        <div className={styles.blur}>
          <div className={styles.itemWrapper} ref={itemLoc}>
            <div className={styles.title}>{`${item?.title}`}</div>
            <div className={styles.line}></div>
            <div className={styles.description}>{`${item?.description}`}</div>
          </div>
        </div>
      )}
    </div>
  );
}
