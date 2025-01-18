const Button = ({
    onClick,
    className,
    children,
    full = false,
    bgColor = "primary",
    type = "button",
}) => {
    let bgClassName = "bg-primary";
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary";
            break;
        case "secondary":
            bgClassName = "bg-secondary";
            break;
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={` px-6 py-3 mt-auto text-white capitalize rounded-lg ${
                full ? "w-full" : ""
            } ${bgClassName} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
