import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Dispatch, SetStateAction } from "react";

type trendingTimeType = "day" | "week";

export function SelectTrendingPeriod({
  period,
  setPeriod,
}: {
  period: trendingTimeType;
  setPeriod: Dispatch<SetStateAction<trendingTimeType>>;
}) {
  return (
    <Select
      onValueChange={(value: trendingTimeType) => setPeriod(value)}
      value={period}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a time period" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Period</SelectLabel>
          <SelectItem className="hover:bg-gray" value="day">
            Day
          </SelectItem>
          <SelectItem value="week">Week</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
