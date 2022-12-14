import React, { useEffect, useState } from 'react'
import { Table, Button, message, Pagination } from 'antd';
import { GetArticleListApi, DeleteArticleApi } from "request/api"
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

const columns = [
    {
        title: '文章标题',
        dataIndex: 'title',
        width: '60%',
    },
    {
        title: '发布时间',
        dataIndex: 'time',
        width: '20%',
    },
    {
        title: '操作',
        dataIndex: 'action',
    },
];

interface IData {
    key: React.Key;
    title: React.ReactNode;
    time: string;
    action: React.ReactNode;
}

//标题与副标题
const TitleComp = (props: { title: string; subTitle?: string; }) => (
    <>
        <div>{props.title}</div>
        <p style={{ color: '#999' }}>{props.subTitle || ""}</p>
    </>
)
//操作按钮的组件
const ActionBtn = (props: { current: number; id: number; getListFn: (page: number, pageSize: number) => void }) => {
    const navigate = useNavigate();

    //点击了编辑按钮
    const goToEdit = () => {
        let id = props.id
        //携带id跳转到edit页面
        navigate('/edit/'+id)
    }
    //点击了删除按钮
    const deleteFn = () => {
        DeleteArticleApi({ id: props.id }).then((res: any) => {
            console.log(res)
            if (res.errCode === 0) {
                message.success(res.message);
                //重新刷新列表
                props.getListFn(props.current, 10)
                //方法2，直接刷新整个页面
                //window.location.reload();
                //方法3设置一个字段，删除成功之后更改这个字段，让getListFn()被再次触发，然后不用传输过来子组件
            } else {
                message.error(res.message);
            }
        })
    }

    return (
        <>
            <Button type='primary' style={{ marginRight: '20px' }} onClick={goToEdit}>编辑</Button>
            <Button type='primary' danger onClick={deleteFn}>删除</Button>
        </>
    )
}

export default function List() {
    //列表数组(泛型)
    const [data, seyData] = useState<IData[]>([])
    //分页组件的数据总条数
    const [total, setTotal] = useState(0);
    //当前页
    const [current, setCurrent] = useState(1);

    //封装了一个请求方法
    const getListFn = (page: number, pageSize: number) => {
        GetArticleListApi({
            current: page,
            counts: pageSize,
        }).then((res: any) => {
            console.log(res)
            if (res.errCode === 0) {
                message.success(res.message)
            }
            let newarr: IData[] = [];
            interface IItem {
                title: string;
                subTitle: string;
                date: string;
                id: number;
            }

            //设置了总数据
            setTotal(res.data.total);
            //设置当前页，每页个数
            setCurrent(res.data.current);
            res.data.arr.map((item: IItem) => {
                let obj = {
                    key: item.id,
                    title: <TitleComp title={item.title} subTitle={item.subTitle} />,
                    time: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
                    action: <ActionBtn current={current} getListFn={getListFn} id={item.id} />
                }
                newarr.push(obj)
            })
            seyData(newarr)
        })
    }

    useEffect(() => {
        getListFn(1, 10);
    }, []);

    const onPageChange = (page: number, pageSize: number) => {
        console.log(page, pageSize);
        //发起请求
        getListFn(page, pageSize);
    };

    return (
        <>
            <Table
                showHeader={false}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <Pagination
                onChange={onPageChange}
                defaultCurrent={1}
                total={total}
            />
        </>
    )
}
