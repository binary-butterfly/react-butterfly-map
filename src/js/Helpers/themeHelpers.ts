import {PartialTheme} from '../Types/types';

export const completeTheme =  (reduceMotion: boolean, theme?: PartialTheme) => {
    return {
        reduceMotion: reduceMotion,
        error: theme?.error ?? 'red',
        success: theme?.success ?? 'green',
        buttonBackground: theme?.buttonBackground ?? 'transparent',
        buttonActiveBackground: theme?.buttonActiveBackground ?? '#ff00ff57',
        buttonFontColor: theme?.buttonFontColor ?? 'initial',
        disabledButtonBackground: theme?.disabledButtonBackground ?? 'lightgray',
        disabledButtonFontColor: theme?.disabledButtonFontColor ?? 'white',
        popupBackgroundColor: theme?.popupBackgroundColor ?? 'white',
        highlightOptionColor: theme?.highlightOptionColor ?? 'lightgray',
        typePopupMinWidth: theme?.typePopupMinWidth ?? '15rem',
        backgroundColor: theme?.backgroundColor ?? '#fff',
    };
};
