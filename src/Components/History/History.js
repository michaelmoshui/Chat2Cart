import styles from "./History.module.css";

export default function History() {
  return (
    <div>
      <div className={styles.historyInfo}>
        <h2>Chat2Cart User Guide</h2>

        <h3>1. Accessing Chat2Cart</h3>
        <p>
          Use your web browser to access Chat2Cart's website for a user-friendly
          interface.
        </p>

        <h3>2. Using the Search Feature</h3>
        <p>
          Enter keywords in the chat bot on the homepage, such as "white
          clothing for holidays."
        </p>

        <h3>3. Browsing Product Results</h3>
        <p>
          After searching, view images and brief Amazon descriptions on the
          left.
        </p>

        <h3>4. Viewing Item Descriptions</h3>
        <p>Click "View Item Description" below a product's image to see:</p>
        <ul>
          <li>Title: Product name.</li>
          <li>Evaluation: Ratings and reviews.</li>
          <li>Image Link: Click the image to go to Amazon for purchase.</li>
        </ul>

        <h3>5. Making a Purchase</h3>
        <p>To buy, follow these steps:</p>
        <ol>
          <li>Click the product image or "View on Amazon."</li>
          <li>On Amazon, add to cart and proceed to checkout.</li>
        </ol>

        <h3>6. FAQs</h3>
        <p>
          <strong>Q: Is Chat2Cart affiliated with Amazon?</strong>
        </p>
        <p>
          <strong>A:</strong> No, we're not affiliated. Use this for searching,
          buy on Amazon.
        </p>

        <p>Thank you for choosing Chat2Cart! Enjoy shopping!</p>
      </div>
    </div>
  );
}
