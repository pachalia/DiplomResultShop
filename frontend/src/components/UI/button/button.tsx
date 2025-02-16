import { useState } from 'react';
import { BUTTON_CORNER_TYPE } from './constants';
import { hexToRgb } from '../../../utils/';
import { ButtonColors } from './constants/colors.enum.ts';

type ButtonType = 'submit' | 'reset' | 'button' | undefined;

interface IButtonProps {
	title: string;
	color?: ButtonColors;
	disabled?: boolean;
	type?: ButtonType;
	backgroundColor?: ButtonColors;
	isBackgroundTransparent?: boolean;
	cornerType?: string;
	height?: string;
	width?: string;
	onClick?: () => void;
}

interface ButtonStyle {
	color: string;
	backgroundColor: string;
	border?: string;
}

export const Button: React.FC<IButtonProps> = ({
	title, // title теперь обязательный
	color = ButtonColors.LIGHT,
	type,
	disabled,
	backgroundColor = ButtonColors.PRIMARY,
	isBackgroundTransparent = false,
	cornerType = BUTTON_CORNER_TYPE.SQUARE,
	height = '20px',
	width = '35px', // исправлено: убрана лишняя пробел
	onClick,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const buttonStyle: ButtonStyle = {
		color,
		backgroundColor,
	};

	if (isHovered && !isBackgroundTransparent) {
		buttonStyle.backgroundColor = hexToRgb(backgroundColor, 0.8);
	} else if (!isHovered && isBackgroundTransparent) {
		buttonStyle.color = hexToRgb(backgroundColor, 0.8);
		buttonStyle.backgroundColor = 'transparent';
		buttonStyle.border = `1px solid ${backgroundColor}`;
	} else if (isHovered && isBackgroundTransparent) {
		buttonStyle.color = '#fff';
		buttonStyle.backgroundColor = backgroundColor;
		buttonStyle.border = `1px solid transparent`;
	}

	const arbitraryHeight = height !== '' ? `h-[${height}px]` : '';
	const arbitraryWidth = width !== '' ? `w-[${width}px]` : '';
	const rounded =
		cornerType === BUTTON_CORNER_TYPE.ROUNDED ? 'rounded-xl' : 'rounded-none';

	return (
		<button
			type={type}
			disabled={disabled}
			className={`${arbitraryHeight} ${arbitraryWidth} ${rounded} font-bold py-1 px-4 transition-all ease-in-out block m-auto`}
			style={buttonStyle}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{title} {/* title используется для отображения текста кнопки */}
		</button>
	);
};
