/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.vue"],
    mode: 'jit',
    media: false,
    plugins: [],
    theme: {
        extend: {
            spacing: {
                "0.5": "0.125rem",
                "1.5": "0.375rem",
                "2.5": "0.625rem",
                "3.5": "0.875rem",
                "4.5": "1.125rem",
                "5.5": "1.375rem",
                "6.5": "1.625rem",
                "7.5": "1.875rem",
                "8.5": "2.125rem",
                "9.5": "2.375rem",
                "10.5": "2.625rem",
                "15": "3.750rem",
                "btn": "2.75rem",  // 50px
                "fill-x": "100vw",
                "fill-y": "100vh"
            },
            minHeight: {
                "0.5": "0.125rem",
                "1": "0.250rem",
                "1.5": "0.375rem",
                "2": "0.5rem",
                "2.5": "0.625rem",
                "3": "0.75rem",
                "3.5": "0.875rem",
                "4": "1rem",
                "4.5": "1.125rem",
                "5": "1.125rem",
                "5.5": "1.375rem",
                "6": "1.5rem",
                "6.5": "1.625rem",
                "7": "1.75rem",
                "7.5": "1.875rem",
                "8": "2rem",
                "8.5": "2.125rem",
                "9": "2.25rem",
                "9.5": "2.375rem",
                "10": "2.5rem",
                "10.5": "2.625rem",
                "btn": "3.125rem",  // 50px
            },
            minWidth: {
                "0.5": "0.125rem",
                "1": "0.250rem",
                "1.5": "0.375rem",
                "2": "0.5rem",
                "2.5": "0.625rem",
                "3": "0.75rem",
                "3.5": "0.875rem",
                "4": "1rem",
                "4.5": "1.125rem",
                "5": "1.125rem",
                "5.5": "1.375rem",
                "6": "1.5rem",
                "6.5": "1.625rem",
                "7": "1.75rem",
                "7.5": "1.875rem",
                "8": "2rem",
                "8.5": "2.125rem",
                "9": "2.25rem",
                "9.5": "2.375rem",
                "10": "2.5rem",
                "10.5": "2.625rem",
            },
            borderRadius: {
                "full": "50%",          //50%
                "0.5xl": "0.625rem",    //10px
                "1.5xl": "0.875rem",    //14px
                "2.3xl": "1.125rem",    //18px
                "2.6xl": "1.250rem",    //20px
                "2.9xl": "1.375rem",    //22px
                "3xl": "1.5rem",        //24px
                "3.1xl": "1.625rem",    //26px
                "3.3xl": "1.750rem",    //28px
                "3.5xl": "1.875rem",    //30px
                "3.7xl": "2.000rem",    //32px
                "3.9xl": "2.125rem",    //34px
                "4xl": "2.250rem",      //36px
                "4x2": "2.500rem",      //40px
            },
            fontSize: {
                "xxs": "11px",          //11px
                "1.5xl": "1.375rem",    //22px
                "2.6xl": "1.625rem",    //26px
                "2.8xl": "1.750rem",    //28px
                "3.4xl": "2.000rem",    //32px
                "3.8xl": "2.125rem",    //34px
            },
            fontFamily: {
                "Sans-Regular": ["Nunito Sans-Regular", "Nunito Sans"],
                "Sans-Bold": ["Nunito Sans-Bold", "Nunito Sans"],
                "Sans-SemiBold": ["Nunito Sans-SemiBold", "Nunito Sans"],
                "Sans-Black": ["Nunito Sans-Black", "Nunito Sans"],
                "PingFang-HK-Regular": ["PingFang HK-Regular", "PingFang HK"],
                "PingFang-HK-Medium": ["PingFang HK-Medium", "PingFang HK"],
                "PingFang-HK-SemiBold": ["PingFang HK-SemiBold", "PingFang HK"],
                "PingFang-SC-Regular": ["PingFang SC-Semibold", "PingFang HK"],
                "PingFang-SC-Medium": ["PingFang SC-Medium", "PingFang HK"],
                "PingFang-SC-SemiBold": ["PingFang SC-SemiBold", "PingFang HK"],
                "RedHat-SemiBold": ["Red Hat Text-SemiBold", "Red Hat Text"],
                "Montserrat-SemiBold": ["Montserrat-SemiBold", "Montserrat"],
                "Montserrat-Medium": ["Montserrat-Medium", "Montserrat"],
                "Montserrat-Regular": ["Montserrat-Regular", "Montserrat"],
                "OPPOSans-Regular": ["OPPOSans-Regular", "OPPOSans"],
                "Inter-Medium": ["Inter-Medium", "Inter"],
                "Inter-Regular": ["Inter-Regular", "Inter"],
                "Inter-SemiBold": ["Inter-SemiBold", "Inter"],
                "Comfortaa-SemiBold": ["Comfortaa-SemiBold", "Comfortaa"],
            },
            boxShadow: {
                def: "0rpx 8rpx 64rpx 0rpx rgba(0,0,0,0.06);",
                small: "0px 4px 4px 0px rgba(0,0,0,0.05);"
            },
            colors: {
                "red10": "#EE4C3E"
            },
        }
    },
}

