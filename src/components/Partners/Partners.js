import Modal from 'antd/lib/modal/Modal'
import { Col, Row } from 'antd'
import React, { useState } from 'react'
import partner1 from '../../assets/img/beggers.png'
import partner2 from '../../assets/img/empire.png'
import partner3 from '../../assets/img/FUGA.png'
import partner4 from '../../assets/img/Kakao-M.png'
import partner5 from '../../assets/img/monstercat.png'
import partner6 from '../../assets/img/orcahrd.png'
import partner7 from '../../assets/img/SM-Entertainment.png'
import partner8 from '../../assets/img/sony.png'
import partner9 from '../../assets/img/universal-1.png'
import partner10 from '../../assets/img/yg.png'
import './partners.css'

const Partners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const partnerList = [
    partner1,
    partner2,
    partner3,
    partner4,
    partner5,
    partner6,
    partner7,
    partner8,
    partner9,
    partner10,
  ]

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="partners-section mt-12">
      {/* partners modal */}
      <div className="partners-title text-text-second text-xs flex items-center justify-center">
        <span
          className="uppercase hover:text-purple cursor-pointer font-bold tracking-widest"
          onClick={showModal}
        >
          Đối tác âm nhạc
        </span>
        <Modal width={740} centered footer={null} open={isModalOpen} onCancel={handleCancel}>
          <div className="flex justify-center mb-5">
            <span className="uppercase text-text-second font-bold tracking-widest text-base">
              Đối tác âm nhạc
            </span>
          </div>
          <div className="modal-content grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5">
            {partnerList.map((item) => (
              <div
                key={item.toString()}
                className="rounded-lg bg-white flex items-center justify-center mb-7 p-2 h-[85px]"
              >
                <img className="h-full" src={item} alt="" />
              </div>
            ))}
          </div>
        </Modal>
      </div>

      <div className="partners-content flex justify-center mt-5">
        <Row gutter={16} justify="center">
          {partnerList.map((item) => (
            <Col key={item.toString()} xs={12} sm={8} md={6} lg={4}>
              <div className="rounded-lg bg-white flex items-center justify-center mb-7 p-2 h-[95px]">
                <img className="h-full" src={item} alt="" />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Partners
