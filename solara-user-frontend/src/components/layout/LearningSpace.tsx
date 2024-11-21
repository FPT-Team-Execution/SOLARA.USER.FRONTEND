"use client"

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { LEARNING_SIMULATIONS_ROUTE, LEARNING_THREATS_ROUTE, LEARNING_TOPICS_ROUTE } from '@/constants/routes';
import SidebarButton from '../ui/SidebarButton';
import { FiLayers } from 'react-icons/fi';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { LuBadgeInfo } from 'react-icons/lu';

const { Sider, Content } = Layout;

const LearningSpace = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>

      <Sider trigger={null} collapsible collapsed={collapsed} theme='light' className='m-4 rounded-2xl'>

        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />

        <div>
          <SidebarButton className='h-12' icon={<FiLayers />} href={LEARNING_TOPICS_ROUTE}>{collapsed ? '' : 'Chủ Đề'}</SidebarButton>
          <SidebarButton className='h-12' icon={<IoExtensionPuzzleOutline />} href={LEARNING_SIMULATIONS_ROUTE}>{collapsed ? '' : 'Giả Lập'}</SidebarButton>
          <SidebarButton className='h-12' icon={<LuBadgeInfo />} href={LEARNING_THREATS_ROUTE}>{collapsed ? '' : 'Rủi Ro'}</SidebarButton>
        </div>

      </Sider>

      <Layout>
        <Content
          className='bg-white my-4 mr-4 rounded-2xl'
        >
          {children}
        </Content>
      </Layout>

    </Layout>
  );
};

export default LearningSpace;