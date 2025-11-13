"use client";
import {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import CustomInput from "../../component/general/input/Input.tsx";
import {RiLockPasswordFill} from "react-icons/ri";
import {BsChatText} from "react-icons/bs";
import CustomButton from "../../component/general/button/Button.tsx";
import {useLogin} from "../../service/user/auth.service.ts";
import {AuthStore} from "../../store/authStore.ts";
import RulerLoadingOverlay from "../../component/general/rulerLoading/RulerLoading.tsx";
// import {enqueueSnackbar} from "notistack";

type FormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {email: "", password: "", remember: true},
  });
  const {setToken} = AuthStore();
  const {mutate,isPending} = useLogin()
  const onSubmit = async (values: FormValues) => {
    mutate({email: values.email, password: values.password}, {
      onSuccess: (value) => {
        setToken(value.token)
      },
      onError: (err) => {
        console.log(err)
        // enqueueSnackbar(err.message, {variant:'error'})
      }
    });
  };

  return (
    <>
      <RulerLoadingOverlay open={isPending} message={'در حال ورود به سیستم'}/>

      <div
        className="min-h-dvh w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4"
        dir="rtl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md"
          aria-label="فرم ورود"
        >
          <div
            className="backdrop-blur-xl bg-white/70 border border-white/60 shadow-2xl rounded-3xl p-6 md:p-8 space-y-6">
            {/* هدر */}
            <div className="text-center space-y-2">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg"/>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">پنل ادمین خط کش </h1>
              <p className="text-sm text-gray-600">لطفاً ایمیل و رمز عبور خود را وارد کنید</p>
            </div>

            <div className="space-y-2">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "ایمیل الزامی است",
                  pattern: {
                    value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                    message: "فرمت ایمیل معتبر نیست",
                  },
                }}
                render={({field}) => (
                  <CustomInput
                    placeholder="ایمیل شما"
                    type="email"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.email && (
                <p role="alert" className="text-xs text-red-600">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* پسورد */}
            <div className="space-y-2">
              <div className="relative">
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "رمز عبور الزامی است",
                    minLength: {
                      value: 6,
                      message: "حداقل ۶ کاراکتر",
                    },
                  }}
                  render={({field}) => (
                    <CustomInput
                      placeholder="رمز ورود"
                      type={showPass ? "text" : "password"}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute inset-y-0 left-2 my-auto text-xs text-indigo-600 hover:underline"
                  aria-label={showPass ? "پنهان کردن رمز" : "نمایش رمز"}
                >
                  {showPass ? <RiLockPasswordFill className={'h-5 w-5'}/> : <BsChatText className={'h-5 w-5'}/>}
                </button>
              </div>
              {errors.password && (
                <p role="alert" className="text-xs text-red-600">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* یادم بماند + فراموشی رمز */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-700 select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  {...register("remember")}
                  defaultChecked
                />
                مرا به خاطر بسپار
              </label>
              {/*<a href="#" className="text-sm text-indigo-600 hover:underline">*/}
              {/*  فراموشی رمز؟*/}
              {/*</a>*/}
            </div>
            <CustomButton
              variant="glass"
              label="ورود"
              type="button"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </form>
      </div>
    </>
  );
}
