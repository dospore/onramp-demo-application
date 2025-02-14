'use client';
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react';
import { Key, useState } from 'react';

import { FundCard, FundCardPropsReact } from '@coinbase/onchainkit/fund';
import { useCoinbaseRampTransaction } from '../contexts/CoinbaseRampTransactionContext';
import { RegionSelector } from './RegionSelector';

export const FundCardDemo = () => {
  const {
    selectedCountry,
    selectedSubdivision,
    selectedCurrency,
    setSelectedCurrency,
    buyOptions,
  } = useCoinbaseRampTransaction();

  const [asset, setAsset] = useState('BTC');
  const [presetAmountInputs, setPresetAmountInputs] = useState<
    FundCardPropsReact['presetAmountInputs']
  >(['10', '20', '30']);

  const handleCurrencySelection = (value: Key | null) => {
    if (value) {
      if (buyOptions) {
        const newCurrency =
          buyOptions.paymentCurrencies.find(
            (currency) => currency.id === value
          ) || null;
        setSelectedCurrency(newCurrency);
      }
    }
  };

  const availableCurrencies = buyOptions?.paymentCurrencies || [];
  return (
    <div className="flex flex-col items-center justify-center flex-wrap gap-4">
      <div className="flex justify-center items-center w-[500px] gap-4 flex-col">
        <FundCard
          key={`${asset}-${selectedCountry?.id}-${selectedCurrency?.id}-${selectedSubdivision}`}
          assetSymbol={asset}
          country={selectedCountry?.id || 'US'}
          currency={selectedCurrency?.id || 'USD'}
          subdivision={selectedSubdivision || undefined}
          presetAmountInputs={presetAmountInputs}
        />
      </div>

      <div className="flex flex-col gap-2 items-center p-4">
        <Card>
          <CardHeader>
            <p className="text-white text-lg">Fund card props</p>
          </CardHeader>
          <CardBody>
            <div>
              <RegionSelector />
            </div>
            <div className="flex pt-4 pb-4  gap-2 flex-wrap">
              <Autocomplete
                isClearable={false}
                label="Currency"
                placeholder="Search for a currency"
                className="w-[200px] my-auto"
                onSelectionChange={handleCurrencySelection}
                selectedKey={selectedCurrency?.id}
              >
                {availableCurrencies.map((currency) => (
                  <AutocompleteItem key={currency.id} value={currency.id}>
                    {currency.id}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

              <Input
                placeholder="asset"
                label="asset"
                variant="bordered"
                value={asset}
                className="w-[150px]"
                onChange={(e) => {
                  setAsset(e.target.value);
                }}
              />

              <Input
                placeholder="presetAmountInputs"
                label="presetAmountInputs"
                variant="bordered"
                className="w-[150px]"
                value={presetAmountInputs?.join(',')}
                onChange={(e) => {
                  setPresetAmountInputs(
                    e.target.value.split(
                      ','
                    ) as unknown as FundCardPropsReact['presetAmountInputs']
                  );
                }}
              />
            </div>
          </CardBody>

          <CardFooter>
            <p className="text-white text-sm cursor-pointer text-blue-500">
              <a
                href="https://onchainkit.xyz/fund/fund-card"
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
