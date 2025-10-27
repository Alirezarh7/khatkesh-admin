import React, {type ChangeEvent, useRef} from 'react';
import DatePicker, {DateObject} from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

interface IProps {
    value?: any;
    onChange?: any;
    onClick?: any;
    buttonTitle?: any;
    withButton?: boolean;
    placeholder?: string;
    name?: string;
    maxLength?: number;
    disabledButton?: boolean;
    disabledInput?: boolean;
    onBeforeInput?: any;
    type?: string;
    pattern?: string;
    customClassName?: string;
    isTextArea?: boolean;
    isDatePicker?: boolean;
    important?: boolean;
}

const CustomInput = ({
                         value,
                         onChange,
                         withButton,
                         name,
                         placeholder,
                         maxLength,
                         onBeforeInput,
                         disabledInput = false,
                         type,
                         pattern,
                         customClassName,
                         isTextArea,
                         isDatePicker,
                         important
                     }: IProps) => {
    const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        if (value.length <= (maxLength || Infinity)) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onChange && onChange(e);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }
    const convertPersianToEnglish = (str: string) => {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        return str.replace(/[۰-۹]/g, (d) => englishDigits[persianDigits.indexOf(d)]);
    };

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    return (
        <div
            className={`w-full relative flex  h-12 border  border-gray-600 rounded-lg  ${isTextArea ? 'h-auto' : ''} ${
                customClassName ? customClassName : ''
            }`}>
            {isDatePicker ? (
                <DatePicker
                    style={{direction: 'ltr'}}
                    calendar={persian}
                    name={name}
                    type={type}
                    maxDate={maxLength}
                    containerClassName={'w-full'}
                    inputClass={'peer w-full my-3 pl-1  text-[13px] sm:text-sm  bg-white text-blue-gray-700 font-normal outline-none focus:outline-0 disabled:bg-blue-gray-50 transition-all '}
                    locale={persian_fa}
                    className={'w-full'}
                    format='YYYY/MM/DD'
                    value={value ? new DateObject({date: value, calendar: persian, locale: persian_fa}) : null}
                    onChange={(date: any) => {
                        if (date instanceof DateObject) {
                            const persianDate = date.format();
                            const englishDate = convertPersianToEnglish(persianDate);
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            onChange && onChange(englishDate);
                        } else {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            onChange && onChange(null);
                        }
                    }}
                />
            ) : isTextArea ? (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    onBeforeInput={onBeforeInput as any}
                    onKeyDown={handleKeyDown}
                    className={`peer my-3 pr-1 ${disabledInput ? 'disabled' : ''}
                    text-[13px] sm:text-sm  w-full bg-white text-blue-gray-700 font-normal outline-none focus:outline-0 disabled:bg-blue-gray-50 transition-all `}
                    placeholder=''
                    name={name}
                    value={value}
                    onChange={onChange}
                    maxLength={type !== 'number' ? maxLength : undefined}
                    rows={4}
                />
            ) : (
                <input
                    dir={type === 'number' || type === 'shiba' ? 'ltr' : 'rtl'}
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    onBeforeInput={onBeforeInput}
                    onKeyDown={handleKeyDown}
                    className={`peer my-3 pr-1 ${withButton ? 'rounded-tr-lg rounded-br-lg rounded-none' : ''} ${disabledInput ? 'disabled' : ''} 
          ${type === 'number' || type === 'shiba' ? 'px-2' : ''} appearance-none text-[12px] sm:text-sm  w-full  text-blue-gray-700 font-normal outline-none focus:outline-0 disabled:bg-blue-gray-50 transition-all `}
                    placeholder=''
                    name={name}
                    type={type}
                    pattern={pattern}
                    value={value}
                    onChange={type === 'number' ? handleNumberInputChange : onChange}
                    maxLength={maxLength}
                />
            )}
            {/*{withButton && (*/}
            {/*    <CustomButton variant='InputClass' label={buttonTitle} onClick={onClick} type={'button'}*/}
            {/*                  disabled={disabledButton}/>*/}
            {/*)}*/}
            {/* Label for DatePicker */}
            {isDatePicker && (
                <label
                    className={`absolute right-1 flex font-normal transition-all ${
                        value ? '!bg-white -top-1.5 text-[10px] px-1' : 'py-0.5 top-2.5 text-[12px]'
                    } w-fit peer-focus:-top-1.5 peer-focus:text-[10px] peer-focus:px-1 peer-focus:bg-white peer-focus:text-gray-900`}>
                    {placeholder}
                    {important ? <div className={'mx-2 text-red-500 text-[10px]'}>*</div> : null}
                </label>
            )}
            {/* Label for other input types */}
            {!isDatePicker && (
                <label
                    className={`absolute right-1 flex font-normal transition-all ${
                        value ? '!bg-white -top-1.5 text-[10px] px-1' : 'py-0.5 top-2.5 text-[12px]'
                    } w-fit peer-focus:-top-1.5 peer-focus:text-[10px] peer-focus:px-1 peer-focus:bg-white peer-focus:text-gray-900`}>
                    {placeholder}
                    {important ? <div className={'mx-2 text-red-500 text-md'}>*</div> : null}
                </label>
            )}
        </div>
    );
};

export default CustomInput;
