import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const rows = ['A', 'B', 'C', 'D', 'E'];
const maxCols = 6;
const zones = ["Inner Ring", "Middle Ring", "Outer Ring", "Custom Zone"];

const LedMatrixEditor = () => {
    const [matrix, setMatrix] = useState({});
    const [selectedZone, setSelectedZone] = useState(zones[0]);
    const [bulkSelection, setBulkSelection] = useState(false);

    const handleCellClick = (row, col) => {
        const logicalAddress = `${row}${col}`;
        const physicalAddress = Object.keys(matrix).length;  // Auto-increment as LED string

        setMatrix(prevMatrix => ({
            ...prevMatrix,
            [logicalAddress]: { physical_address: physicalAddress, zone: selectedZone }
        }));
    };

    const handleBulkSelect = () => {
        const newMatrix = {};
        rows.forEach(row => {
            Array.from({ length: maxCols }).forEach((_, col) => {
                const logicalAddress = `${row}${col + 1}`;
                newMatrix[logicalAddress] = {
                    physical_address: Object.keys(newMatrix).length,
                    zone: selectedZone
                };
            });
        });
        setMatrix(newMatrix);
    };

    const handleClearAll = () => {
        setMatrix({});
    };

    const handleSave = async () => {
        const formattedData = { LEDs: Object.entries(matrix).map(([logical_address, data]) => ({
            logical_address,
            ...data
        }))};

        try {
            await axios.post('http://<RaspberryPi_IP>:5000/update-matrix', formattedData);
            alert('Matrix configuration updated successfully!');
        } catch (error) {
            alert('Failed to update matrix configuration.');
            console.error(error);
        }
    };

    return (
        <div className="grid gap-4">
            <div className="flex gap-2 items-center">
                <label htmlFor="zoneSelect">Zone:</label>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger id="zoneSelect">{selectedZone}</SelectTrigger>
                    <SelectContent>
                        {zones.map(zone => (
                            <SelectItem key={zone} value={zone}>
                                {zone}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Checkbox
                    checked={bulkSelection}
                    onCheckedChange={() => setBulkSelection(!bulkSelection)}
                >
                    Bulk Select
                </Checkbox>
            </div>

            <div className="grid grid-cols-6 gap-1">
                {rows.map(row => (
                    Array.from({ length: maxCols }).map((_, col) => {
                        const logicalAddress = `${row}${col + 1}`;
                        return (
                            <div
                                key={logicalAddress}
                                className={`w-10 h-10 border-2 flex items-center justify-center cursor-pointer ${matrix[logicalAddress] ? 'bg-green-400' : 'bg-gray-200'}`}
                                onClick={() => bulkSelection ? handleBulkSelect() : handleCellClick(row, col + 1)}
                            >
                                {logicalAddress}
                            </div>
                        );
                    })
                ))}
            </div>

            <div className="flex gap-2 mt-4">
                <Button onClick={handleSave}>Save Matrix Configuration</Button>
                <Button onClick={handleClearAll} className="bg-red-500">Clear All</Button>
            </div>
        </div>
    );
};

export default LedMatrixEditor;
