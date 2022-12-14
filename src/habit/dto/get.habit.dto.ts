import { ApiProperty } from '@nestjs/swagger';
import { HabitRecordDay } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class GetHabitDto {
  @ApiProperty({ type: Number, description: '습관 Id' })
  id!: number;

  @ApiProperty({ type: String, description: '제목' })
  title!: string;

  @ApiProperty({ type: String, description: '습관' })
  action!: string;

  @ApiProperty({ type: Number, description: '목표치' })
  value!: number;

  @ApiProperty({ description: '단위', type: String })
  unit!: string;

  @ApiProperty({ type: Number, description: '수행 시간', example: '10:10' })
  time!: string | null;

  @ApiProperty({ type: Date, description: '시작 날짜', example: '2022-12-11' })
  startDate!: Date;

  @IsOptional()
  @ApiProperty({ type: Date, description: '종료 날짜', example: '2022-12-11' })
  endDate!: Date;

  @ApiProperty({
    description: '수행 요일',
    isArray: true,
    enum: HabitRecordDay,
    enumName: 'HabitRecordDay',
  })
  days!: HabitRecordDay[];
}