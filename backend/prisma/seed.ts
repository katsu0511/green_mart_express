import 'dotenv/config';
import { Role } from '@/lib/generated/prisma/client.js';
import prisma from '@/lib/prisma.js';
import bcrypt from 'bcrypt';

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const adminHash = await bcrypt.hash("admin1234", 10);
  const userHash = await bcrypt.hash("user1234", 10);

  await prisma.user.create({
    data: {
      email: "admin@navymart.local",
      passwordHash: adminHash,
      name: "店舗管理者",
      address: "東京都千代田区1-1-1",
      role: Role.ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      email: "user@navymart.local",
      passwordHash: userHash,
      name: "山田太郎",
      address: "神奈川県横浜市西区2-2-2",
      role: Role.CUSTOMER,
    },
  });

  const kitchen = await prisma.category.create({
    data: { name: "キッチン", slug: "kitchen" },
  });
  const bath = await prisma.category.create({
    data: { name: "バス", slug: "bath" },
  });
  const stationery = await prisma.category.create({
    data: { name: "文具", slug: "stationery" },
  });
  const interior = await prisma.category.create({
    data: { name: "インテリア", slug: "interior" },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "木製スプーンセット",
        description: "日常使いにちょうどよい3本セット。食洗機非対応。",
        price: 1280,
        stock: 24,
        imageUrl: '',
        categoryId: kitchen.id,
      },
      {
        name: "琺瑯マグカップ",
        description: "紺の縁取りが特徴の350mlマグ。",
        price: 1980,
        stock: 18,
        imageUrl: '',
        categoryId: kitchen.id,
      },
      {
        name: "リネンエプロン",
        description: "洗いざらしリネン。キッチンから園芸まで。",
        price: 4200,
        stock: 10,
        imageUrl: '',
        categoryId: kitchen.id,
      },
      {
        name: "今治フェイスタオル",
        description: "吸水性の高い薄手タオル。白と紺のボーダー。",
        price: 1650,
        stock: 40,
        imageUrl: '',
        categoryId: bath.id,
      },
      {
        name: "石鹸置き（陶器）",
        description: "水はけのよい波型。洗面まわりをすっきり。",
        price: 980,
        stock: 30,
        imageUrl: '',
        categoryId: bath.id,
      },
      {
        name: "再生紙ノート A5",
        description: "無地80枚。デスクに馴染む紺の表紙。",
        price: 540,
        stock: 80,
        imageUrl: '',
        categoryId: stationery.id,
      },
      {
        name: "真鍮クリップ 10個",
        description: "書類や袋閉じに。少しずつ色味が変わる素材。",
        price: 760,
        stock: 50,
        imageUrl: '',
        categoryId: stationery.id,
      },
      {
        name: "綿麻クッションカバー",
        description: "45cm角。中材は付属しません。",
        price: 2480,
        stock: 16,
        imageUrl: '',
        categoryId: interior.id,
      },
      {
        name: "ガラス花瓶 ミニ",
        description: "一本挿し用。窓辺の小さな花向け。",
        price: 1320,
        stock: 22,
        imageUrl: '',
        categoryId: interior.id,
      },
      {
        name: "在庫僅少のキャンドル",
        description: "ダッシュボード確認用の少在庫商品。",
        price: 880,
        stock: 2,
        imageUrl: '',
        categoryId: interior.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
