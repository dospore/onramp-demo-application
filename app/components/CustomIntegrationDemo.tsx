'use client';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import Image from 'next/image';
import { memo, useState } from 'react';
import OrderHistoryIcon from '../assets/orderHistory.svg';
import { useCoinbaseRampTransaction } from '../contexts/CoinbaseRampTransactionContext';
import { AmountInput } from './AmountInput';
import { ChainTokenSelector } from './ChainTokenSelector';
import { CurrencySelector } from './CurrencySelector';
import { OrderHistory } from './OrderHistory';
import { RampTransactionSummary } from './RampTransactionSummary';
import { RegionSelector } from './RegionSelector';
import { WalletConnector } from './WalletConnector';

export const CustomIntegrationDemo = memo(function CustomIntegrationDemo() {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const { authenticated } = useCoinbaseRampTransaction();

  return (
    <>
      <div className="flex gap-4 justify-center py-4">
        <WalletConnector />
        {authenticated && (
          <Image
            onClick={() => setShowOrderHistory(true)}
            className="cursor-pointer hover:opacity-50 active:opacity-30"
            src={OrderHistoryIcon}
            width={24}
            height={24}
            alt="Order History"
            aria-label="Order History"
          />
        )}
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <RegionSelector />

        <div className="flex flex-col md:flex-row justify-around min-h-[750px] max-w-screen md:w-[1000px] m-auto gap-4 md:gap-0">
          <div className="flex flex-col gap-4 grow">
            <AmountInput />
            <div className="flex flex-col md:flex-row gap-4 items-center justify-around">
              <ChainTokenSelector />
              <CurrencySelector />
            </div>
          </div>

          <div className="flex justify-center items-center w-full md:w-[400px]  my-8 md:my-0">
            <RampTransactionSummary />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showOrderHistory}
        onClose={() => setShowOrderHistory(false)}
      >
        <ModalContent className="h-[800px]">
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Order History
            </ModalHeader>
            <ModalBody>
              <OrderHistory />
            </ModalBody>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
});
