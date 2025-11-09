import { useTempFilterStore } from "@/store/useTempFilterStore";
import Slider from "../ui/Slider";
import "react-range-slider-input/dist/style.css";
import { formatAmount } from "@/lib/utils";
import { useEffect } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { IndianRupee } from "lucide-react";

const HotelPriceFilter = () => {
    const { tempMinBudget, tempMaxBudget, setTempMinBudget, setTempMaxBudget } = useTempFilterStore();
    const { minBudget, maxBudget } = useSearchStore.getState();
    const value: [number, number] = [tempMinBudget, tempMaxBudget];
    
    useEffect(() => {
        setTempMinBudget(minBudget);
        setTempMaxBudget(maxBudget);
    }, [minBudget, maxBudget, setTempMinBudget, setTempMaxBudget]);
    
    const setValue = (newValues: [number, number]) => {
        const [newMin, newMax] = newValues;
        if (newMin >= newMax) return;
        setTempMinBudget(newMin);
        setTempMaxBudget(newMax);
    };
    
    return (
        <div className="space-y-6">
            <div className="px-1">
                <Slider
                    min={0}
                    max={50000}
                    step={100}
                    defaultValue={[500, 10000]}
                    value={value}
                    onInput={setValue}
                    rangeSlideDisabled={true}
                />
            </div>
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1 rounded-lg border border-border bg-background p-3">
                    <div className="text-xs text-muted-foreground mb-1">Minimum</div>
                    <div className="flex items-center gap-1 font-semibold text-lg">
                        <IndianRupee className="h-4 w-4" />
                        {formatAmount(tempMinBudget)}
                    </div>
                </div>
                <div className="text-muted-foreground">—</div>
                <div className="flex-1 rounded-lg border border-border bg-background p-3">
                    <div className="text-xs text-muted-foreground mb-1">Maximum</div>
                    <div className="flex items-center gap-1 font-semibold text-lg">
                        <IndianRupee className="h-4 w-4" />
                        {formatAmount(tempMaxBudget)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelPriceFilter;
