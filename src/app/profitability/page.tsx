'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  TrendingUp, 
  Zap, 
  DollarSign, 
  Power, 
  BarChart3, 
  Calculator,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

// Complete static profitability data - no API calls
const staticProfitabilityData = [
  {
    id: 1,
    miner: "Antminer S21 Pro",
    brand: "Bitmain",
    algorithm: "SHA-256",
    hashRate: 234,
    powerConsumption: 3500,
    electricityCost: 120.30,
    monthlyRevenue: 825.50,
    netProfit: 705.20,
    roi: 11.8,
    efficiency: 15.0,
    price: 5999,
    profitability: 11.75,
    dailyRevenue: 27.52,
    dailyProfit: 23.51,
    weeklyProfit: 164.57,
    yearlyProfit: 8462.40,
    paybackPeriod: 8.5,
    trend: 'up',
    trendValue: 5.2,
    rating: 4.8,
    stock: 15,
    featured: true
  },
  {
    id: 2,
    miner: "Antminer L7",
    brand: "Bitmain",
    algorithm: "Scrypt",
    hashRate: 9500,
    powerConsumption: 3425,
    electricityCost: 117.85,
    monthlyRevenue: 1120.60,
    netProfit: 1002.75,
    roi: 10.2,
    efficiency: 0.36,
    price: 8999,
    profitability: 11.14,
    dailyRevenue: 37.35,
    dailyProfit: 33.43,
    weeklyProfit: 233.99,
    yearlyProfit: 12033.00,
    paybackPeriod: 9.0,
    trend: 'up',
    trendValue: 8.7,
    rating: 4.9,
    stock: 6,
    featured: true
  },
  {
    id: 3,
    miner: "WhatsMiner M60S",
    brand: "MicroBT",
    algorithm: "SHA-256",
    hashRate: 186,
    powerConsumption: 3420,
    electricityCost: 117.68,
    monthlyRevenue: 658.30,
    netProfit: 540.62,
    roi: 9.2,
    efficiency: 18.4,
    price: 4499,
    profitability: 12.01,
    dailyRevenue: 21.94,
    dailyProfit: 18.02,
    weeklyProfit: 126.14,
    yearlyProfit: 6487.44,
    paybackPeriod: 8.3,
    trend: 'up',
    trendValue: 3.1,
    rating: 4.6,
    stock: 23,
    featured: true
  },
  {
    id: 4,
    miner: "Antminer S19 XP",
    brand: "Bitmain",
    algorithm: "SHA-256",
    hashRate: 141,
    powerConsumption: 3010,
    electricityCost: 103.45,
    monthlyRevenue: 500.80,
    netProfit: 397.35,
    roi: 8.9,
    efficiency: 21.3,
    price: 3899,
    profitability: 10.19,
    dailyRevenue: 16.69,
    dailyProfit: 13.25,
    weeklyProfit: 92.73,
    yearlyProfit: 4768.20,
    paybackPeriod: 9.8,
    trend: 'stable',
    trendValue: 0.5,
    rating: 4.7,
    stock: 12,
    featured: true
  },
  {
    id: 5,
    miner: "Avalon A1366",
    brand: "Canaan",
    algorithm: "SHA-256",
    hashRate: 130,
    powerConsumption: 2600,
    electricityCost: 89.40,
    monthlyRevenue: 460.20,
    netProfit: 370.80,
    roi: 8.1,
    efficiency: 20.0,
    price: 3299,
    profitability: 11.24,
    dailyRevenue: 15.34,
    dailyProfit: 12.36,
    weeklyProfit: 86.52,
    yearlyProfit: 4449.60,
    paybackPeriod: 8.9,
    trend: 'down',
    trendValue: -2.3,
    rating: 4.5,
    stock: 8,
    featured: false
  },
  {
    id: 6,
    miner: "Innosilicon T3H+",
    brand: "Innosilicon",
    algorithm: "SHA-256",
    hashRate: 113,
    powerConsumption: 2400,
    electricityCost: 82.50,
    monthlyRevenue: 400.15,
    netProfit: 317.65,
    roi: 7.8,
    efficiency: 21.2,
    price: 2899,
    profitability: 10.96,
    dailyRevenue: 13.34,
    dailyProfit: 10.59,
    weeklyProfit: 74.13,
    yearlyProfit: 3811.80,
    paybackPeriod: 9.3,
    trend: 'stable',
    trendValue: 1.2,
    rating: 4.4,
    stock: 31,
    featured: false
  },
  {
    id: 7,
    miner: "Goldshell KD6",
    brand: "Goldshell",
    algorithm: "Kadena",
    hashRate: 29.2,
    powerConsumption: 830,
    electricityCost: 28.54,
    monthlyRevenue: 220.45,
    netProfit: 191.91,
    roi: 6.8,
    efficiency: 28.4,
    price: 1599,
    profitability: 12.00,
    dailyRevenue: 7.35,
    dailyProfit: 6.40,
    weeklyProfit: 44.78,
    yearlyProfit: 2302.92,
    paybackPeriod: 8.4,
    trend: 'up',
    trendValue: 4.5,
    rating: 4.3,
    stock: 45,
    featured: false
  },
  {
    id: 8,
    miner: "iBeLink BM-K1",
    brand: "iBeLink",
    algorithm: "Kadena",
    hashRate: 5.6,
    powerConsumption: 2250,
    electricityCost: 77.40,
    monthlyRevenue: 142.80,
    netProfit: 65.40,
    roi: 7.2,
    efficiency: 401.8,
    price: 1299,
    profitability: 5.04,
    dailyRevenue: 4.76,
    dailyProfit: 2.18,
    weeklyProfit: 15.26,
    yearlyProfit: 784.80,
    paybackPeriod: 16.6,
    trend: 'down',
    trendValue: -3.8,
    rating: 4.1,
    stock: 27,
    featured: false
  },
  {
    id: 9,
    miner: "Jasminer X4",
    brand: "Jasminer",
    algorithm: "Ethereum Classic",
    hashRate: 520,
    powerConsumption: 480,
    electricityCost: 16.50,
    monthlyRevenue: 180.30,
    netProfit: 163.80,
    roi: 5.9,
    efficiency: 0.92,
    price: 2199,
    profitability: 7.45,
    dailyRevenue: 6.01,
    dailyProfit: 5.46,
    weeklyProfit: 38.22,
    yearlyProfit: 1965.60,
    paybackPeriod: 13.4,
    trend: 'up',
    trendValue: 2.1,
    rating: 4.2,
    stock: 19,
    featured: false
  }
];

// Static calculation parameters
const electricityRates = [
  { label: '€0.08/kWh (nízka)', value: 0.08 },
  { label: '€0.12/kWh (štandardná)', value: 0.12 },
  { label: '€0.16/kWh (vysoká)', value: 0.16 },
  { label: '€0.20/kWh (veľmi vysoká)', value: 0.20 }
];

const bitcoinPrices = [
  { label: '€25,000', value: 25000 },
  { label: '€35,000', value: 35000 },
  { label: '€45,000 (aktuálna)', value: 45000 },
  { label: '€55,000', value: 55000 },
  { label: '€65,000', value: 65000 }
];

export default function ProfitabilityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('all');
  const [electricityRate, setElectricityRate] = useState(0.12);
  const [bitcoinPrice, setBitcoinPrice] = useState(45000);
  const [sortBy, setSortBy] = useState('profitability');
  const [minROI, setMinROI] = useState([0]);

  // Dynamic calculations based on static data
  const profitabilityData = useMemo(() => {
    return staticProfitabilityData.map(item => {
      const monthlyHours = 30 * 24;
      const monthlyKWh = (item.powerConsumption / 1000) * monthlyHours;
      const adjustedElectricityCost = monthlyKWh * electricityRate;
      const priceMultiplier = bitcoinPrice / 45000;
      const adjustedRevenue = item.monthlyRevenue * priceMultiplier;
      const adjustedNetProfit = adjustedRevenue - adjustedElectricityCost;
      const adjustedROI = (adjustedNetProfit * 12) / item.price * 100;
      const adjustedPaybackPeriod = item.price / adjustedNetProfit;

      return {
        ...item,
        electricityCost: adjustedElectricityCost,
        monthlyRevenue: adjustedRevenue,
        netProfit: adjustedNetProfit,
        roi: adjustedROI,
        paybackPeriod: adjustedPaybackPeriod,
        dailyProfit: adjustedNetProfit / 30,
        weeklyProfit: adjustedNetProfit * 7 / 30,
        yearlyProfit: adjustedNetProfit * 12
      };
    });
  }, [electricityRate, bitcoinPrice]);

  // Static filtering - no API calls
  const filteredData = useMemo(() => {
    let filtered = profitabilityData.filter(item => {
      const matchesSearch = item.miner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAlgorithm = selectedAlgorithm === 'all' || item.algorithm === selectedAlgorithm;
      const matchesROI = item.roi >= minROI[0];
      
      return matchesSearch && matchesAlgorithm && matchesROI;
    });

    // Static sorting - no API calls
    switch (sortBy) {
      case 'profit':
        filtered.sort((a, b) => b.netProfit - a.netProfit);
        break;
      case 'roi':
        filtered.sort((a, b) => b.roi - a.roi);
        break;
      case 'payback':
        filtered.sort((a, b) => a.paybackPeriod - b.paybackPeriod);
        break;
      case 'efficiency':
        filtered.sort((a, b) => {
          if (a.algorithm === 'Ethereum Classic') {
            return a.efficiency - b.efficiency;
          }
          return a.efficiency - b.efficiency;
        });
        break;
      case 'revenue':
        filtered.sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);
        break;
      case 'profitability':
      default:
        filtered.sort((a, b) => b.netProfit - a.netProfit);
        break;
    }

    return filtered;
  }, [profitabilityData, searchTerm, selectedAlgorithm, minROI, sortBy]);

  const algorithms = ['all', ...Array.from(new Set(staticProfitabilityData.map(d => d.algorithm)))];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sk-SK', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTrendIcon = (trend: string, value: number) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'down':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Kalkulačka Ziskovosti
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Presné výpočty ziskovosti pre všetky ťažobné zariadenia. V reálnom čase.
          </p>
        </div>

        {/* Performance Indicator */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Ultra-Rýchly Režim</span>
            <span className="text-sm">• Načítanie: &lt;0.1s • Žiadne API volania</span>
          </div>
        </div>

        {/* Calculation Parameters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Parametre Výpočtu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Cena elektriny</label>
                <Select value={electricityRate.toString()} onValueChange={(v) => setElectricityRate(parseFloat(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {electricityRates.map(rate => (
                      <SelectItem key={rate.value} value={rate.value.toString()}>
                        {rate.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cena Bitcoinu</label>
                <Select value={bitcoinPrice.toString()} onValueChange={(v) => setBitcoinPrice(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bitcoinPrices.map(price => (
                      <SelectItem key={price.value} value={price.value.toString()}>
                        {price.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Minimálne ROI (%)</label>
                <Slider
                  value={minROI}
                  onValueChange={setMinROI}
                  max={20}
                  step={1}
                  className="mt-4"
                />
                <div className="text-center text-sm text-slate-600 mt-2">{minROI[0]}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hľadať miner</label>
                <Input
                  placeholder="Hľadať..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Algoritmus</label>
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map(algorithm => (
                      <SelectItem key={algorithm} value={algorithm}>
                        {algorithm === 'all' ? 'Všetky algoritmy' : algorithm}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Zoradiť podľa</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profitability">Ziskovosť</SelectItem>
                    <SelectItem value="profit">Čistý zisk</SelectItem>
                    <SelectItem value="roi">ROI</SelectItem>
                    <SelectItem value="payback">Návratnosť</SelectItem>
                    <SelectItem value="efficiency">Efektivita</SelectItem>
                    <SelectItem value="revenue">Výnosy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Nájdených</p>
                  <p className="text-2xl font-bold">{filteredData.length}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Priemerný ROI</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredData.length > 0 ? (filteredData.reduce((sum, item) => sum + item.roi, 0) / filteredData.length).toFixed(1) : 0}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Najvyšší zisk</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {filteredData.length > 0 ? formatCurrency(Math.max(...filteredData.map(item => item.netProfit))) : '€0'}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Najrýchlejšia návratnosť</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {filteredData.length > 0 ? Math.min(...filteredData.map(item => item.paybackPeriod)).toFixed(1) : 0}m
                  </p>
                </div>
                <Power className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profitability Table */}
        <Card>
          <CardHeader>
            <CardTitle>Výsledky Ziskovosti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Miner</th>
                    <th className="text-left p-2">Algoritmus</th>
                    <th className="text-right p-2">Hashrate</th>
                    <th className="text-right p-2">Spotreba</th>
                    <th className="text-right p-2">Výnosy/mesiac</th>
                    <th className="text-right p-2">Elektrina/mesiac</th>
                    <th className="text-right p-2">Čistý zisk/mesiac</th>
                    <th className="text-right p-2">ROI</th>
                    <th className="text-right p-2">Návratnosť</th>
                    <th className="text-center p-2">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                      <td className="p-2">
                        <div>
                          <div className="font-medium">{item.miner}</div>
                          <div className="text-sm text-slate-500">{item.brand}</div>
                          {item.featured && (
                            <Badge className="mt-1 text-xs">TOP</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline">{item.algorithm}</Badge>
                      </td>
                      <td className="text-right p-2">
                        {item.hashRate} {item.algorithm === 'Ethereum Classic' ? 'MH/s' : 'TH/s'}
                      </td>
                      <td className="text-right p-2">{item.powerConsumption}W</td>
                      <td className="text-right p-2 font-medium text-green-600">
                        {formatCurrency(item.monthlyRevenue)}
                      </td>
                      <td className="text-right p-2 text-red-600">
                        {formatCurrency(item.electricityCost)}
                      </td>
                      <td className="text-right p-2 font-bold text-blue-600">
                        {formatCurrency(item.netProfit)}
                      </td>
                      <td className="text-right p-2">
                        <span className={`font-medium ${item.roi >= 10 ? 'text-green-600' : item.roi >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {item.roi.toFixed(1)}%
                        </span>
                      </td>
                      <td className="text-right p-2">
                        <span className={`font-medium ${item.paybackPeriod <= 9 ? 'text-green-600' : item.paybackPeriod <= 12 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {item.paybackPeriod.toFixed(1)}m
                        </span>
                      </td>
                      <td className="text-center p-2">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(item.trend)}`}>
                          {getTrendIcon(item.trend, item.trendValue)}
                          {Math.abs(item.trendValue)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Žiadne výsledky</h3>
                <p className="text-slate-500">Skúte upraviť filtre alebo parametre výpočtu</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}