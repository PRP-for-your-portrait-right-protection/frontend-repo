import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";
import { HiOutlineX } from "react-icons/hi";

const Modal = (props) => {
  // 열기, 닫기를 부모로부터 받아옴
  const { open, close } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}>
              <HiOutlineX size="38" color="red" />
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button
              className="close justify-center place-items-center"
              onClick={close}
            >
              COMPLETE
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.bool.isRequired,
  children: React.ReactNode,
};
