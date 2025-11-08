import type {ReactNode} from "react";

interface IProps {
    variant?:
        | "glass"
        | "Cancel"
        | "select"
        | "InputClass"
        | "outLine"
    type?: "submit" | "button";
    label?: any;
    labelClassName?: string;
    icon?: ReactNode;
    onClick?: () => void;
    className?: string;
    loading?: boolean;
    disabled?: boolean;
}

const CustomButton = ({
                          variant,
                          type,
                          label,
                          icon,
                          onClick,
                          loading,
                          disabled,
                          labelClassName,
                      }: IProps) => {
    const glassClasses =
        "w-full inline-flex items-center justify-center rounded-2xl px-4 py-3 font-semibold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 ";
    const outLineClasses =
        " w-fit !text-foreground min-w-32 cursor-pointer text-sm bg-card focus:ring-4 focus:outline-none border border-primary focus:ring-[var(--chatBotColor)] font-medium rounded-lg  p-2.5 text-center m-2 ";
    const CancelClasses = " w-fit text-white text-sm bg-gradient-to-r from-red-700 to-red-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gridColor font-medium rounded-lg  p-2.5 text-center  m-2  ";
    const InputClass = ' w-fit text-white text-sm focus:ring-indigo-500 disabled:opacity-60 bg-gradient-to-r from-indigo-600 to-purple-600 font-medium rounded-lg  p-2.5 text-center  m-2';

    const classNameCreator = (): string => {
        let finalClassName = `${disabled ? "disabled" : "enable"} outline-none duration-300 py-2  text-text  font-semibold `;
        if (variant === "glass") {
            finalClassName += glassClasses;
        } else if (variant === "outLine") {
            finalClassName += outLineClasses;
        } else if (variant === "Cancel") {
            finalClassName += CancelClasses;
        } else if (variant === "InputClass") {
            finalClassName += InputClass;
        }
        finalClassName +=
            "  !disabled:bg-gray-300 !disabled:border-gray-300";
        return finalClassName;
    };

    const loadingIconCreator = () => {
        return (
            <div className="w-6 h-6 rounded-xl animate-spin border-2 border-gray-400 border-t-gray-800"></div>
        );
    };

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={classNameCreator()}>
            {loading ? (
                loadingIconCreator()
            ) : icon ? (
                <div className="flex justify-center items-center mx-[10px] ">
                    <div className="mx-1">{icon}</div>
                    <div className={labelClassName}>{label}</div>
                </div>
            ) : (
                label
            )}
        </button>
    );
};

export default CustomButton;
