import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Card, CardContent } from '@/shared/components/ui/Card';
import { Input } from '@/shared/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/Table';
import {
  Edit,
  Search,
  Package,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
} from 'lucide-react';

const products = [
  {
    id: 1,
    sku: 'TSH-WHT-001',
    name: 'เสื้อยืดสีขาว',
    description: 'เสื้อยืดผ้าฝ้าย 100% สีขาว',
    category: 'เสื้อผ้า',
    categoryColor: 'blue',
    price: 299,
    stock: 150,
    status: 'ปกติ',
    statusColor: 'green',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100&h=100&fit=crop',
    ],
  },
  {
    id: 2,
    sku: 'JNS-BLU-001',
    name: 'กระเป๋าสะพาย',
    description: 'กระเป๋าสะพายหนังแท้สีน้ำตาล',
    category: 'กระเป๋า',
    categoryColor: 'amber',
    price: 1299,
    stock: 25,
    status: 'ปกติ',
    statusColor: 'green',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=100&h=100&fit=crop',
    ],
  },
  {
    id: 3,
    sku: 'SHO-WHT-001',
    name: 'รองเท้าผ้าใบ',
    description: 'รองเท้าผ้าใบสีขาว สำหรับออกกำลังกาย',
    category: 'รองเท้า',
    categoryColor: 'purple',
    price: 1599,
    stock: 8,
    status: 'สต็อกต่ำ',
    statusColor: 'orange',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&h=100&fit=crop',
    ],
  },
];

export default function SkuManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getBadgeClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      amber:
        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      purple:
        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      green:
        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      orange:
        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-5">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <Card className="relative overflow-hidden border border-slate-200 bg-gradient-to-br from-blue-50 to-white shadow-sm transition-all dark:border-slate-700 dark:from-blue-900/30 dark:to-slate-900">
          <CardContent className="p-5">
            <div className="absolute top-3 right-3 rounded-full bg-blue-100 p-2 dark:bg-blue-900/40">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                สินค้าทั้งหมด
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                4
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                รายการสินค้า
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-slate-200 bg-gradient-to-br from-green-50 to-white shadow-sm transition-all dark:border-slate-700 dark:from-green-900/30 dark:to-slate-900">
          <CardContent className="p-5">
            <div className="absolute top-3 right-3 rounded-full bg-green-100 p-2 dark:bg-green-900/40">
              <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                ของดี
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                364
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">ชิ้น</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-slate-200 bg-gradient-to-br from-red-50 to-white shadow-sm transition-all dark:border-slate-700 dark:from-red-900/30 dark:to-slate-900">
          <CardContent className="p-5">
            <div className="absolute top-3 right-3 rounded-full bg-red-100 p-2 dark:bg-red-900/40">
              <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                ของเสีย
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                13
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">ชิ้น</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-slate-200 bg-gradient-to-br from-purple-50 to-white shadow-sm transition-all dark:border-slate-700 dark:from-purple-900/30 dark:to-slate-900">
          <CardContent className="p-5">
            <div className="absolute top-3 right-3 rounded-full bg-purple-100 p-2 dark:bg-purple-900/40">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                มูลค่าสต็อก
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                ฿157,542
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                มูลค่ารวม
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        {/* Search Section */}
        <div className="border-b bg-muted/30 p-5 lg:p-6">
          <h2 className="mb-4 text-lg font-semibold lg:text-xl">ค้นหาสินค้า</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อสินค้าหรือ SKU..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="หมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                <SelectItem value="clothes">เสื้อผ้า</SelectItem>
                <SelectItem value="bags">กระเป๋า</SelectItem>
                <SelectItem value="shoes">รองเท้า</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Section - Desktop */}
        <div className="hidden overflow-x-auto lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 font-semibold">รูปภาพ</TableHead>
                <TableHead className="px-6 font-semibold">SKU</TableHead>
                <TableHead className="px-6 font-semibold">ชื่อสินค้า</TableHead>
                <TableHead className="px-6 font-semibold">หมวดหมู่</TableHead>
                <TableHead className="px-6 font-semibold">ราคา</TableHead>
                <TableHead className="px-6 font-semibold">สต็อก</TableHead>
                <TableHead className="px-6 font-semibold">สถานะ</TableHead>
                <TableHead className="px-6 text-center font-semibold">
                  จัดการ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center">
                      {product.images.map((src, i) => (
                        <div
                          key={i}
                          className="relative transition-transform duration-200 hover:z-10 hover:scale-105"
                          style={{ marginLeft: i === 0 ? 0 : -35 }}
                        >
                          <img
                            src={src}
                            alt={product.name}
                            className="h-12 w-12 rounded-md border-2 border-white object-cover shadow-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="font-mono text-sm font-medium">
                      {product.sku}
                    </p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200 border border-sky-200 dark:border-sky-700`}
                    >
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-semibold">
                    ฿{product.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4">{product.stock}</TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${getBadgeClasses(product.statusColor)}`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <Button size="icon" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards View */}
        <div className="space-y-3 p-4 lg:hidden">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-mono text-sm font-medium">
                        {product.sku}
                      </p>
                      <p className="mt-1 font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200 border border-sky-200 dark:border-sky-700`}
                    >
                      {product.category}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getBadgeClasses(product.statusColor)}`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">ราคา</p>
                      <p className="font-semibold">
                        ฿{product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">สต็อก</p>
                      <p className="font-semibold">{product.stock}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
