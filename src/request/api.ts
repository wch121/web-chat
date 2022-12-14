import request from './request'

interface IRegisterLogin {
    username: string;
    password: string;
}

// 注册接口
export const RegisterApi = (params: IRegisterLogin) => request.post('/register', params)

// 登录接口
export const LoginApi = (params: IRegisterLogin) => request.post('/login', params)

//获取用户信息
export const UserInfoApi = () => request.get('/info')

interface IChangeUserInfo {
    username?: string;
    password?: string;
}
//修改用户信息
//username和password目前是可传可不传
export const ChangeUserInfoApi = (params: IChangeUserInfo) => request.post('/info', params)

//获取文章列表
interface IGetArticleListApi{
    current:number;
    counts:number;
}
export const GetArticleListApi = (params:IGetArticleListApi) => request.post('/article/list',params)

//根据id获取文章
// export const GetArticleByIdApi = (params:{id:number}) => request.get(`/article/info/${params.id}`)
export const GetArticleByIdApi = (params: { id: number }) => request.post('/article/info/', params)

//文章编辑接口
interface IEditArticle {
    
    title: string;
    subTitle?: string;
    content: string;
    id?: number;
}

export const EditArticleApi = (params: IEditArticle) => request.post('/article/edit', params)

//文章删除接口
export const DeleteArticleApi =(params:{id:number})=>request.post('/article/delete',params)

//文章添加接口
interface IAddArticle {
    
    title: string;
    subTitle?: string;
    content: string;
}
export const AddArticleApi =(params:IAddArticle)=>request.post('/article/add',params)

//获取小编名单
export const EditorApi =()=>request.get('/namelist')

//修改小编编辑权限
interface IChangeEditorApi{
    id:number;
    open:number;
}
export const ChangeEditorApi =(params:IChangeEditorApi)=>request.post('/namelist',params)