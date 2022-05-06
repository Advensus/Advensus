import React, { useState } from "react";

export interface IStatisticsProps {
    default_props?: boolean;
}

export const StatisticsPage: React.FC<IStatisticsProps> = () => {
    return (
        <div className="stat_page_container">
            <div className="stat_page_block">Stat1</div>
            <div className="stat_page_block">Stat2</div>
            <div className="stat_page_block">Stat3</div>
            <div className="stat_page_block">Stat4</div>
            <div className="stat_page_block">Stat5</div>
            <div className="stat_page_block">Stat2</div>
            <div className="stat_page_block">Stat3</div>
            <div className="stat_page_block">Stat4</div>
            <div className="stat_page_block">Stat5</div>
            <div className="stat_page_block">Stat2</div>
            <div className="stat_page_block">Stat3</div>
            <div className="stat_page_block">Stat4</div>
            <div className="stat_page_block">Stat5</div>
            <div className="stat_page_block">Stat2</div>
            <div className="stat_page_block">Stat3</div>
            <div className="stat_page_block">Stat4</div>
        </div>
    );
};
