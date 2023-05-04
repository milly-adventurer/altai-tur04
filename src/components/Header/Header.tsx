import React, { useEffect, useMemo, useState } from 'react';

import css from "./Header.module.scss";

import cn from 'classnames';
import { Link as ScrollLink } from 'react-scroll';
import { CMSAnchor } from "@/models/cms";
import Image from "next/image";


import whatsAppImg from 'static/assets/images/whatsapp.svg';
import telegramImg from 'static/assets/images/telegram.svg';
import vkImg from 'static/assets/images/vk.svg';
import Link from "next/link";
import { useRouter } from "next/router";

interface HeaderProps {
  navLinks: (CMSAnchor & { external?: boolean })[];
}

const Header = (props: HeaderProps) => {
  const { navLinks } = props;

  const [isMenuOpened, setIsMenuOpened] = useState(false);
	const [sticky, setSticky] = useState(false);
	
	const { query } = useRouter();
	
	useEffect(() => {
		const onScroll = (e: Event) => {
			if (!sticky && window.scrollY > 35) {
				setSticky(true);
				return;
			}
			
			if (sticky && window.scrollY < 36) {
				setSticky(false);
			}
		}
		window.addEventListener('scroll', onScroll);
		
		return () => {
			window.removeEventListener('scroll', onScroll);
		}
	}, [sticky]);

  return (
    <header className={cn(css.header, { [css.headerOpened]: isMenuOpened })}>
			<div className={cn(css.wrapper, {
				[css.headerSticky]: sticky,
			})}>
				<div className={css.container}>
					<button aria-label="Открыть/закрыть меню" onClick={() => setIsMenuOpened(!isMenuOpened)} className={css.burgerButton}>
						<div></div>
						<div></div>
						<div></div>
					</button>
					<nav className={css.navigation}>
						<ul className={css.navLinks}>
							{navLinks.map(({ name, external, id }, i) => {
								return (
									<li className={css.navLinkItem} key={i}>
										{external || query.type ?
											<Link href={"/"}>{name}</Link> :
											id === 'телефон' ?
												<a href={`tel:${name}`}>{name}</a> :
											<ScrollLink smooth duration={500} to={id}>{name}</ScrollLink>}
									</li>
								);
							})}
						</ul>
						<ul className={css.socialsList}>
							<li>
								<a href="https://wa.me/79039191960" target="_blank" className={css.socialItem}>
									<Image className={css.socialImg} src={whatsAppImg} alt={'Whatsapp'} />
								</a>
							</li>
							<li>
								<a href="https://t.me/altai_estetik_tour" target="_blank" className={css.socialItem}>
									<Image className={css.socialImg} src={telegramImg} alt={'Telegram'} />
								</a>
							</li>
							<li>
								<a href="https://vk.com/altai_estetik_tour" target="_blank" className={css.socialItem}>
									<Image className={cn(css.socialImg, css.vk)} src={vkImg} alt={'vk'} />
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
    </header>
  );
}

export default Header;
