    const monthlyCount = await prisma.workoutRecord.groupBy({
      by: ["completeDate"],
      where: { userId: userId, isComplete: true },
      having: {
        completeDate: { lte: lastDayOfMonth, gte: firstDayOfMonth },
      },
      _count: { id: true },
    });
    console.log(monthlyCount);