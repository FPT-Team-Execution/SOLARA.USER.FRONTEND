"use client"

import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { LEARNING_PACKAGES_ROUTE, LEARNING_SIMULATIONS_ROUTE, LEARNING_THREATS_ROUTE, LEARNING_TOPICS_ROUTE } from '@/constants/routes';
import SidebarButton from '../UI/SidebarButton';
import { FiLayers } from 'react-icons/fi';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { LuBadgeInfo } from 'react-icons/lu';
import { GoPackage } from "react-icons/go";

const { Sider, Content } = Layout;

const LearningSpace = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>

      <Sider trigger={null} collapsible collapsed={collapsed} theme='light' className='m-4 rounded-2xl'>

        <Button
          className='my-4'
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />

        <div>
          <SidebarButton isMultiPath pathIndex={2} className={`h-12 flex ${collapsed == true ? "items-center justify-center" : ""} m-2 p-4`} icon={<FiLayers />} href={LEARNING_TOPICS_ROUTE}>{collapsed ? '' : 'Chủ Đề'}</SidebarButton>
          <SidebarButton pathIndex={1} className={`h-12 flex ${collapsed == true ? "items-center justify-center" : ""} m-2 p-4`} icon={<IoExtensionPuzzleOutline />} href={LEARNING_SIMULATIONS_ROUTE}>{collapsed ? '' : 'Giả Lập'}</SidebarButton>
          <SidebarButton pathIndex={1} className={`h-12 flex ${collapsed == true ? "items-center justify-center" : ""} m-2 p-4`} icon={<LuBadgeInfo />} href={LEARNING_THREATS_ROUTE}>{collapsed ? '' : 'Rủi Ro'}</SidebarButton>
          <SidebarButton isMultiPath pathIndex={2} className={`h-12 flex ${collapsed == true ? "items-center justify-center" : ""} m-2 p-4`} icon={<GoPackage />} href={LEARNING_PACKAGES_ROUTE}>{collapsed ? '' : 'Dịch Vụ'}</SidebarButton>
        </div>

      </Sider>

      <Layout>
        <Content
          className='bg-white my-4 mr-4 rounded-2xl p-4'
        >
          {children}
        </Content>
      </Layout>

    </Layout>
  );
};

export default LearningSpace;