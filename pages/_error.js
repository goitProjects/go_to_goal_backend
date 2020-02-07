// import React from 'react';
// import Link from 'next/link';

// const errorPage = () => (
//     <div>
//         <h1>Oops, something went wrong.</h1>
//         <p>Try <Link href="/"><a>going back</a></Link>.</p>
//     </div>
// );

// export default errorPage;

import React from "react";
import Link from "next/link";
import styles from "./_error.module.css";

const NotFound = () => {
  return (
    <div className={styles["bg-purple"]}>
      <div className={styles["stars"]}>
        <div className={styles["central-body"]}>
          <img
            className={styles["image-404"]}
            src="/public/img/notFound/404.svg"
            width="300px"
          />
          <Link href="/">
            <a
              // href="/"
              className={styles["btn-go-home"]}
              // rel="noreferrer noopener"
            >
              GO BACK HOME
            </a>
          </Link>
        </div>
        <div className={styles["objects"]}>
          <img
            className={styles["object_rocket"]}
            src="/public/img/notFound/rocket.svg"
            width="40px"
          />
          <div className={styles["earth-moon"]}>
            <img
              className={styles["object_earth"]}
              src="/public/img/notFound/earth.svg"
              width="100px"
            />
            <img
              className={styles["object_moon"]}
              src="/public/img/notFound/moon.svg"
              width="80px"
            />
          </div>
          <div className={styles["box_astronaut"]}>
            <img
              className={styles["object_astronaut"]}
              src="/public/img/notFound/astronaut.svg"
              width="140px"
            />
          </div>
        </div>
        <div className={styles["glowing_stars"]}>
          <div className={styles["star"]}></div>
          <div className={styles["star"]}></div>
          <div className={styles["star"]}></div>
          <div className={styles["star"]}></div>
          <div className={styles["star"]}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
