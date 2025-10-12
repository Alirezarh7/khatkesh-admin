

const AddToHomeScreen = () => {
    // const [showPrompt, setShowPrompt] = useState<boolean>(false);


    // const isAppleMobile = /iPhone|iPad|iPod/.test(navigator.userAgent);
    // const isAndroidMobile = /android/i.test(navigator.userAgent);

    // useEffect(() => {
    //     if (isAppleMobile) {
    //
    //         const isStandalone = (navigator as any).standalone;
    //         const alreadyInstalled = localStorage.getItem('alreadyInstalled');
    //
    //         // if (!isStandalone && !alreadyInstalled) {
    //         //     setShowPrompt(true);
    //         // }
    //     }
    //
    //     // if (isAndroidMobile) {
    //     //     const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    //     //     const alreadyInstalled = localStorage.getItem('alreadyInstalled');
    //     //
    //     //     if (!isStandalone && !alreadyInstalled) {
    //     //         setShowPrompt(true);
    //     //     }
    //     //
    //     //
    //     // }
    // }, []);

    // const handleAddToHomeScreen = async () => {
    //     // if ((deferredPromptRef as any).current && isAndroidMobile) {
    //     //     (deferredPromptRef as any).current.prompt();
    //     //     const {outcome} = await (deferredPromptRef as any).current.userChoice;
    //     //
    //     //     if (outcome === 'accepted') {
    //     //         localStorage.setItem('alreadyInstalled', 'true');
    //     //         setShowPrompt(false);
    //     //     }
    //     // } else {
    //         setShowPrompt(false);
    //     // }

    // if (!showPrompt) return null;
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100'>
            {/*<div className='bg-white p-4 rounded-lg mx-2'>*/}
            {/*    <div className='flex justify-center'>*/}
            {/*        <img src='/image/Arm.png' alt='تدارکات و تغذیه' height={80} width={80}/>*/}
            {/*    </div>*/}
            {/*    <div className='text-center mt-4'>*/}
            {/*        {isAppleMobile ?*/}
            {/*            <strong>وب اپلیکیشن تدارکات و تغذیه را به صفحه اصلی گوشی تان اضافه کنید.</strong>*/}
            {/*            : <strong>شما میتوانید اپلیکیشن تدارکات و تغذیه را نصب کنید.</strong>}*/}
            {/*    </div>*/}
            {/*    <div className='mt-4 border border-gray-500 rounded-lg p-2 text-center'>*/}
            {/*        {isAppleMobile ?*/}
            {/*            <p>در نوار پایین دکمه <span className='font-bold'>Share</span> را بزنید و سپس <span*/}
            {/*                className='font-bold'>Add to Home Screen</span> را انتخاب کنید.</p>*/}
            {/*            :*/}
            {/*            <p>برای دسترسی سریع‌تر، اپ را به صفحه اصلی اضافه کنید.</p>}*/}
            {/*    </div>*/}
            {/*    /!*<CustomButton label={'بستن'} variant={'select'}*!/*/}
            {/*    /!*              onClick={handleAddToHomeScreen} type={'button'}*!/*/}
            {/*    /!*              className={'w-full my-3'}/>*!/*/}
            {/*</div>*/}
        </div>
    );
};

export default AddToHomeScreen;