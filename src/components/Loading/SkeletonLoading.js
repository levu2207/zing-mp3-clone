import { Col, Row } from 'antd'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import './loader.css'

const SkeletonLoading = () => {
  return (
    <div className="w-full h-full px-[50px] pt-[40px]">
      <Row gutter={16}>
        <Col span={24} md={12} lg={8}>
          <Skeleton height={200} className="!bg-[#1a1129]" />
        </Col>
        <Col span={0} md={12} lg={8}>
          <Skeleton height={200} className="!bg-[#1a1129]" />
        </Col>
        <Col span={0} md={0} lg={8}>
          <Skeleton height={200} className="!bg-[#1a1129]" />
        </Col>
      </Row>

      <Skeleton height={30} width={150} className="!bg-[#1a1129] mt-20" />

      <Row gutter={16} className="pt-10">
        <Col span={24} md={12} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
        <Col span={0} md={12} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
        <Col span={0} md={0} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
      </Row>

      <Row gutter={16} className="pt-10">
        <Col span={24} md={12} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
        <Col span={0} md={12} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
        <Col span={0} md={0} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
      </Row>

      <Row gutter={16} className="pt-10">
        <Col span={24} md={12} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
        <Col span={0} md={12} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
        <Col span={0} md={0} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
      </Row>

      <Row gutter={16} className="pt-10">
        <Col span={24} md={12} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
        <Col span={0} md={12} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
        <Col span={0} md={0} lg={8}>
          <div className="flex">
            <Skeleton height={60} width={300} className="!bg-[#1a1129]" />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SkeletonLoading
