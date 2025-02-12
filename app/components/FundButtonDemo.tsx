'use client';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Code,
  Input,
} from '@nextui-org/react';
import { useState } from 'react';

import { FundButton } from '@coinbase/onchainkit/fund';

export const FundButtonDemo = () => {
  const [text, setText] = useState('Fund');
  const [hideIcon, setHideIcon] = useState(false);
  const [fiatCurrency, setFiatCurrency] = useState('USD');

  return (
    <div className="flex flex-col items-center justify-center flex-wrap gap-4">
      <Code className="text-white text-2xl p-4">{'<FundButton />'}</Code>

      <div className="flex justify-center items-center w-[500px] gap-4 flex-col">
        <FundButton
          key={`${text}-${fiatCurrency}`}
          hideIcon={hideIcon}
          text={text}
          fiatCurrency={fiatCurrency}
        />
      </div>

      <div className="flex flex-col gap-2 items-center p-4">
        <Card>
          <CardHeader>
            <p className="text-white text-lg">Fund button props</p>
          </CardHeader>
          <CardBody>
            <div className="flex pt-4 pb-4  gap-2 flex-wrap">
              <Input
                placeholder="text"
                label="text"
                variant="bordered"
                value={text}
                className="w-[150px]"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />

              <Input
                placeholder="fiatCurrency"
                label="fiatCurrency"
                variant="bordered"
                value={fiatCurrency}
                className="w-[150px]"
                onChange={(e) => {
                  setFiatCurrency(e.target.value);
                }}
              />

              <div className="flex flex-col gap-2 items-center">
                <p className="text-default-500">
                  hideIcon: {hideIcon ? 'true' : 'false'}
                </p>
                <Checkbox
                  placeholder="hideIcon"
                  className="w-[150px]"
                  isSelected={hideIcon}
                  onValueChange={(e) => {
                    setHideIcon(e);
                  }}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <p className="text-white text-sm cursor-pointer text-blue-500">
              <a
                href="https://onchainkit.xyz/fund/fund-button"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                See full documentation here
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
