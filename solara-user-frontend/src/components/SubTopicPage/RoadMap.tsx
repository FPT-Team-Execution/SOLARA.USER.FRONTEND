
interface IProps {
    even: boolean;
}

const RoadMap = ({ even }: IProps) => {
    return (
        <svg transform={even ? '' : 'scale(-1, 1)'} version="1.1" viewBox="0 0 2048 931" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {/* <path transform="translate(0)" d="m0 0h2048v931h-2048z" fill="#535353" /> */}
            {/* <path transform="translate(256)" d="m0 0h1792v931h-140l-9-39-8-27-10-28-15-33-12-23-15-25-11-16-13-18-13-16-11-13-24-26-8-7v-2l-4-2-9-9-8-7-13-11-17-13-16-12-33-22-22-13-16-9-23-12-29-14-38-16-41-15-41-13-26-7-52-13-52-10-43-7-46-6-49-5-55-4-42-2-33-1-75-1-49-1-60-3-47-4-51-6-40-6-48-9-50-12-35-10-36-12-25-9-30-13-25-12-25-13-26-16-16-11-19-14-14-12-8-7-13-12-8-8-7-8-9-10-13-17-14-21-10-17-13-27-9-24-6-19-5-25-3-34-1-19-3-15z" fill="#535353" /> */}
            {/* <path transform="translate(94)" d="m0 0h162l5 16 1 7 3 45 4 24 5 19 8 23 10 23 13 25 18 27 10 13 12 14 16 17 17 16 14 11 11 9 20 14 19 12 17 10 29 15 21 10 29 12 30 11 41 13 38 10 34 8 54 10 49 7 57 6 41 3 45 2 49 1 75 1 59 2 59 4 52 5 48 6 39 6 48 9 27 6 52 13 43 13 29 10 34 13 32 14 33 16 23 12 25 15 16 10 19 13 19 14 14 11 11 9 11 10 8 7 7 6v2l4 2 13 13 7 8 13 14 9 11 11 14 13 18 14 21 14 24 14 27 11 25 13 37 7 26 6 26v5h-179l-4-10-7-19-10-23-13-23-9-14-8-11-7-9-11-13-12-13-16-16-11-9-13-11-2-1v-2l-5-2-16-12-20-13-22-13-28-15-24-11-32-13-27-10-28-9-36-10-24-6-43-9-49-8-36-5-48-5-59-4-52-2-127-2-67-3-61-5-51-6-52-8-29-5-28-6-40-9-45-12-42-13-33-12-30-12-25-11-35-17-24-13-17-10-22-14-16-11-15-11-14-11-11-9-13-11-15-14-28-28-7-8-12-14-10-13-14-19-15-23-14-24-13-25-11-25-11-30-8-26-7-29-4-25-3-27-1-15v-26l3-17 3-10z" fill="#2E2E2E" /> */}
            <path transform="translate(934,512)" d="m0 0 99 1 34 1v16h-38l-93-1-2-1z" fill="#BABABA" />
            <path transform="translate(233,220)" d="m0 0 3 1 10 17 13 18 10 13 8 10 10 11 7 8 22 22-2 4-7 8-4-1-25-25-7-8-12-14-10-13-13-18-15-23 1-3z" fill="#BABABA" />
            <path transform="translate(423,397)" d="m0 0 5 2 25 13 33 15 30 12 27 10-2 9-3 7-30-11-30-12-26-12-16-8-17-9-3-1 1-4z" fill="#BABABA" />
            <path transform="translate(1462,577)" d="m0 0 29 10 37 15 30 14 25 13 1 4-5 8-2 3-5-2-32-16-34-15-29-11-20-7 2-9z" fill="#BABABA" />
            <path transform="translate(1694,708)" d="m0 0 4 2 9 9 7 6 7 8 14 15 9 11 11 14 12 17 13 20-5 5-7 4-3-1-14-22-12-16-11-14-13-15-15-16-10-10-6-5 2-4z" fill="#BABABA" />
            <path transform="translate(671,484)" d="m0 0 15 2 46 8 68 9 1 1v8l-1 7-16-1-46-6-54-9-16-4 2-11z" fill="#BABABA" />
            <path transform="translate(1201,523)" d="m0 0 30 3 50 7 44 8 7 2-1 9-2 6-9-1-53-9-68-9z" fill="#BABABA" />
            <path transform="translate(173,26)" d="m0 0 6 1 4 5 1 30 4 31v6l-15 3-2-8-3-22-2-29 1-12z" fill="#BABABA" />
            
        </svg>
    )
}

export default RoadMap


// const RoadMap = () => {
//     return (
//         <svg
//             version="1.1"
//             viewBox="0 0 2048 931"
//             width="90%"
//             height="100%"
//             xmlns="http://www.w3.org/2000/svg"
//             transform="scale(-1, 1)" // Lật ngược theo chiều ngang
//         >
//             <path transform="translate(0)" d="m0 0h2048v931h-2048z" fill="#535353" />
//             <path transform="translate(256)" d="m0 0h1792v931h-140l-9-39-8-27-10-28-15-33-12-23-15-25-11-16-13-18-13-16-11-13-24-26-8-7v-2l-4-2-9-9-8-7-13-11-17-13-16-12-33-22-22-13-16-9-23-12-29-14-38-16-41-15-41-13-26-7-52-13-52-10-43-7-46-6-49-5-55-4-42-2-33-1-75-1-49-1-60-3-47-4-51-6-40-6-48-9-50-12-35-10-36-12-25-9-30-13-25-12-25-13-26-16-16-11-19-14-14-12-8-7-13-12-8-8-7-8-9-10-13-17-14-21-10-17-13-27-9-24-6-19-5-25-3-34-1-19-3-15z" fill="#535353" />
//             <path transform="translate(94)" d="m0 0h162l5 16 1 7 3 45 4 24 5 19 8 23 10 23 13 25 18 27 10 13 12 14 16 17 17 16 14 11 11 9 20 14 19 12 17 10 29 15 21 10 29 12 30 11 41 13 38 10 34 8 54 10 49 7 57 6 41 3 45 2 49 1 75 1 59 2 59 4 52 5 48 6 39 6 48 9 27 6 52 13 43 13 29 10 34 13 32 14 33 16 23 12 25 15 16 10 19 13 19 14 14 11 11 9 11 10 8 7 7 6v2l4 2 13 13 7 8 13 14 9 11 11 14 13 18 14 21 14 24 14 27 11 25 13 37 7 26 6 26v5h-179l-4-10-7-19-10-23-13-23-9-14-8-11-7-9-11-13-12-13-16-16-11-9-13-11-2-1v-2l-5-2-16-12-20-13-22-13-28-15-24-11-32-13-27-10-28-9-36-10-24-6-43-9-49-8-36-5-48-5-59-4-52-2-127-2-67-3-61-5-51-6-52-8-29-5-28-6-40-9-45-12-42-13-33-12-30-12-25-11-35-17-24-13-17-10-22-14-16-11-15-11-14-11-11-9-13-11-15-14-28-28-7-8-12-14-10-13-14-19-15-23-14-24-13-25-11-25-11-30-8-26-7-29-4-25-3-27-1-15v-26l3-17 3-10z" fill="#2E2E2E" />
//             <path transform="translate(934,512)" d="m0 0 99 1 34 1v16h-38l-93-1-2-1z" fill="#BABABA" />
//             <path transform="translate(233,220)" d="m0 0 3 1 10 17 13 18 10 13 8 10 10 11 7 8 22 22-2 4-7 8-4-1-25-25-7-8-12-14-10-13-13-18-15-23 1-3z" fill="#BABABA" />
//             <path transform="translate(423,397)" d="m0 0 5 2 25 13 33 15 30 12 27 10-2 9-3 7-30-11-30-12-26-12-16-8-17-9-3-1 1-4z" fill="#BABABA" />
//             <path transform="translate(1462,577)" d="m0 0 29 10 37 15 30 14 25 13 1 4-5 8-2 3-5-2-32-16-34-15-29-11-20-7 2-9z" fill="#BABABA" />
//             <path transform="translate(1694,708)" d="m0 0 4 2 9 9 7 6 7 8 14 15 9 11 11 14 12 17 13 20-5 5-7 4-3-1-14-22-12-16-11-14-13-15-15-16-10-10-6-5 2-4z" fill="#BABABA" />
//             <path transform="translate(671,484)" d="m0 0 15 2 46 8 68 9 1 1v8l-1 7-16-1-46-6-54-9-16-4 2-11z" fill="#BABABA" />
//             <path transform="translate(1201,523)" d="m0 0 30 3 50 7 44 8 7 2-1 9-2 6-9-1-53-9-68-9z" fill="#BABABA" />
//             <path transform="translate(173,26)" d="m0 0 6 1 4 5 1 30 4 31v6l-15 3-2-8-3-22-2-29 1-12z" fill="#BABABA" />
//         </svg>
//     );
// };

// export default RoadMap;