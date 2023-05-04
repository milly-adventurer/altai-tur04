import React, { PropsWithChildren } from 'react';
import ReactModal from "react-modal";
import css from "./Popup.module.scss";
import { RiCloseFill } from "react-icons/ri";
import cn from "classnames";

export interface PopupProps {
	isOpen: boolean;
	onClose(): void;
	contentClassName?: string;
	className?: string;
}

const Popup = (props: PropsWithChildren<PopupProps>) => {
	const { contentClassName, className, isOpen, onClose, children } = props;

	return (
		<ReactModal
			isOpen={isOpen}
			className={cn(css.modal, className)}
			overlayClassName={css.overlay}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
			onAfterOpen={() => {
				document.body.style.overflow = 'hidden';
			}}
			onAfterClose={() => {
				document.body.style.overflow = 'unset';
			}}
		>
			<div className={cn(css.content, contentClassName)}>
				<RiCloseFill onClick={onClose} className={css.close} />
				{children}
			</div>
		</ReactModal>
	);
};

export default Popup;
