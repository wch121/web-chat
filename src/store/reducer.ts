// interface IState {
//     username: string;
//     player: string;
//     avatar: string;
// }

// // 定义默认数据
// const defaultState: IState = {
//     username: "",
//     player: "",
//     avatar: "",
// };

// interface IAction {
//     type: string;
//     value?: unknown;
// }

// // eslint-disable-next-line
// export default (state = defaultState, action: IAction) => {
//     let newState = JSON.parse(JSON.stringify(state));
//     switch (action.type) {
//         case "ChangeUsername":	// 修改名称
//             newState.username = action.value;
//             break;
//         case "ChangePlayer":	// 修改角色
//             newState.player = action.value;
//             break;
//         case "ChangeAvatar": 	// 修改头像
//             newState.avatar = action.value;
//             break;
//         default:
//             break;
//     }
//     return newState;
// };

// 定义默认数据
const defaultState = {
    //Myheader组件的key
    key: 1
};

interface IAction {
    type: string;
    value?: any;
}

// eslint-disable-next-line
export default (state = defaultState, action: IAction) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "changeKey":
            newState.key++;
            break;
        default:
            break;
    }
    return newState;
};