import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function Home() {

  const players = await prisma.player.findMany();

  const trainings = await prisma.training.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalPlayers = players.length;

  const totalTrainings = trainings.length;

  const averageDuration =
    trainings.length > 0
      ? Math.round(
          trainings.reduce(
            (acc, training) => acc + training.duration,
            0
          ) / trainings.length
        )
      : 0;

  const highIntensityCount = trainings.filter(
    (training) =>
      training.intensity === "高"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-900">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              青训足球战术分析系统
            </h1>

            <p className="text-gray-500 mt-2">
              广州丰奥体育 · 教练后台
            </p>
          </div>

          <div className="text-right">
            <p className="text-gray-500">
              今日训练人数
            </p>

            <h2 className="text-3xl font-bold">
              {players.length}
            </h2>
          </div>

        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              总球员人数
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalPlayers}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              训练总次数
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalTrainings}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              平均训练时长
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {averageDuration} 分钟
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              高强度训练
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {highIntensityCount}
            </h2>

          </div>

        </div>

        {/* Add Player */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            新增球员
          </h2>

          <form
            action={async (formData) => {
              "use server";

              await prisma.player.create({
                data: {
                  name: String(formData.get("name")),
                  age: Number(formData.get("age")),
                  position: String(formData.get("position")),
                  speed: Number(formData.get("speed")),
                  shooting: Number(formData.get("shooting")),
                },
              });

              revalidatePath("/");
            }}
            className="grid grid-cols-2 gap-4"
          >

            <input
              name="name"
              placeholder="球员姓名"
              className="border p-3 rounded-xl"
            />

            <input
              name="age"
              placeholder="年龄"
              className="border p-3 rounded-xl"
            />

            <input
              name="position"
              placeholder="位置"
              className="border p-3 rounded-xl"
            />

            <input
              name="speed"
              placeholder="速度"
              className="border p-3 rounded-xl"
            />

            <input
              name="shooting"
              placeholder="射门"
              className="border p-3 rounded-xl"
            />

            <button
              type="submit"
              className="bg-black text-white rounded-xl p-3"
            >
              保存球员
            </button>

          </form>

        </div>

        {/* Training Management */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            训练管理
          </h2>

          <form
            action={async (formData) => {
              "use server";

              await prisma.training.create({
                data: {
                  date: String(formData.get("date")),
                  title: String(formData.get("title")),
                  duration: Number(formData.get("duration")),
                  intensity: String(formData.get("intensity")),
                  note: String(formData.get("note")),
                },
              });

              revalidatePath("/");
            }}
            className="grid grid-cols-2 gap-4 mb-6"
          >

            <input
              name="date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="border p-3 rounded-xl"
            />

            <input
              name="title"
              placeholder="训练主题"
              className="border p-3 rounded-xl"
            />

            <input
              name="duration"
              placeholder="训练时长（分钟）"
              className="border p-3 rounded-xl"
            />

            <input
              name="intensity"
              placeholder="训练强度"
              className="border p-3 rounded-xl"
            />

            <input
              name="note"
              placeholder="教练备注"
              className="border p-3 rounded-xl col-span-2"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-xl p-3"
            >
              保存训练
            </button>

          </form>

          <div className="space-y-4">

            {trainings.map((training) => (

              <div
                key={training.id}
                className="border rounded-2xl p-4"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="text-xl font-bold">
                      {training.title}
                    </h3>

                    <p className="text-gray-500">
                      {training.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      强度
                    </p>

                    <p className="font-bold">
                      {training.intensity}
                    </p>
                  </div>

                </div>

                <div className="mt-3 space-y-1">

                  <p>
                    训练时长：{training.duration} 分钟
                  </p>

                  <p>
                    教练备注：{training.note}
                  </p>

                </div>

                <form
                  action={async () => {
                    "use server";

                    await prisma.training.delete({
                      where: {
                        id: training.id,
                      },
                    });

                    revalidatePath("/");
                  }}
                >

                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    删除训练
                  </button>

                </form>

              </div>

            ))}

          </div>

        </div>

        {/* Player List */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            球员列表
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {players.map((player) => (

              <div
                key={player.id}
                className="border rounded-2xl p-4"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="text-xl font-bold">
                      {player.name}
                    </h3>

                    <p className="text-gray-500">
                      {player.position}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      年龄
                    </p>

                    <p className="font-bold">
                      {player.age}
                    </p>
                  </div>

                </div>

                <div className="mt-4 space-y-3">

                  <div>
                    <p className="text-sm mb-1">
                      速度：{player.speed}
                    </p>

                    <div className="w-full bg-gray-200 rounded-full h-2">

                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${player.speed}%`,
                        }}
                      />

                    </div>
                  </div>

                  <div>
                    <p className="text-sm mb-1">
                      射门：{player.shooting}
                    </p>

                    <div className="w-full bg-gray-200 rounded-full h-2">

                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${player.shooting}%`,
                        }}
                      />

                    </div>
                  </div>

                </div>

                <form
                  action={async () => {
                    "use server";

                    await prisma.player.delete({
                      where: {
                        id: player.id,
                      },
                    });

                    revalidatePath("/");
                  }}
                >

                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    删除球员
                  </button>

                </form>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}