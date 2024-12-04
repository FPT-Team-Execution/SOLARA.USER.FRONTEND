import { GetPagedTopicsRequest } from '@/types/topic';
import useTopicStore from '@/zustand/useTopicStore';
import { useDebounce } from 'ahooks';
import { Row, Col, Button, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
const { Option } = Select;

interface IProps {
    query: GetPagedTopicsRequest;
    updateQuery: (key: keyof GetPagedTopicsRequest, value: string | number | boolean) => void;
}

const TopicQuery = (props: IProps) => {
    const { query, updateQuery } = props;
    const { topics } = useTopicStore();
    const [localSearchKey, setLocalSearchKey] = useState(query.searchKey);

    // Debounce giá trị nhập vào
    const debouncedSearchKey = useDebounce(localSearchKey!, { wait: 500 });

    // Cập nhật giá trị vào query khi debounce hoàn thành
    useEffect(() => {
        if (debouncedSearchKey !== query.searchKey) {
            updateQuery('searchKey', debouncedSearchKey);
        }
    }, [debouncedSearchKey, query.searchKey, updateQuery]);

    const handleChangedebounced = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchKey(e.target.value); // Cập nhật giá trị cục bộ
    };

    return (
        <Row gutter={[16, 16]} className='flex justify-center items-center'>

            {/* Search Key */}
            <Col className='flex flex-col'>
                <Input
                    placeholder='Tìm kiếm'
                    type="text"
                    value={localSearchKey}
                    onChange={handleChangedebounced}
                />
            </Col>

            {/* OrderOn */}
            <Col className='flex flex-col'>
                <Select
                    value={query.orderOn}
                    onChange={(value) => updateQuery('orderOn', value as string)}
                >
                    <Option value={"topicName"}>Tên chủ đề</Option>
                    <Option value={"description"}>Mô tả</Option>
                    <Option value={'createdOn'}>Ngày tạo</Option>
                </Select>
            </Col>

            {/* Sort */}
            <Col className='flex flex-col'>
                <Select
                    value={query.isAscending}
                    onChange={(value) => updateQuery('isAscending', value as boolean)}
                >
                    <Option value={true}>ASC</Option>
                    <Option value={false}>DESC</Option>
                </Select>
            </Col>

            {/* Pagination */}
            <Col className='flex flex-col'>
                <div className='space-x-1 flex'>
                    <Button
                        className='min-w-10'
                        onClick={() => updateQuery('page', query.page - 1)}
                        disabled={query.page <= 1}
                        icon={'-'}
                    >
                    </Button>
                    <Input
                        className='max-w-20 text-center'
                        value={query.page + "/" + topics?.totalPages}
                        readOnly
                    />
                    <Button
                        className='min-w-10'
                        onClick={() => updateQuery('page', query.page + 1)}
                        disabled={query.page == topics?.totalPages}
                        icon={'+'}>
                    </Button>
                </div>
            </Col>

            {/* Page Size */}
            <Col className="flex flex-col">
                <Select
                    value={query.size}
                    onChange={(value) => updateQuery('size', value as number)}
                >
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                    <Option value={50}>50</Option>
                    <Option value={100}>100</Option>
                </Select>
            </Col>

            {/* Total Items */}
            {/* <Col className='flex flex-col'>
                <Text strong>Tổng cọng:</Text>

                <div>
                    <Input
                        className='w-12 text-center'
                        value={topics?.total}
                        readOnly
                    />
                </div>

            </Col> */}

            {/* Total Pages */}
            {/* <Col className='flex flex-col'>
                <Text strong>Tổng trang:</Text>

                <div>
                    <Input
                        className='w-6 text-center'
                        value={topics?.totalPages}
                        readOnly
                    />
                </div>

            </Col> */}

        </Row>
    );
};
export default TopicQuery;
