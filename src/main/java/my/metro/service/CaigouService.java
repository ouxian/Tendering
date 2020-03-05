package my.metro.service;

import my.metro.entities.Caigou;

import java.util.List;

/**
 * Created by hk on 2018/8/14.
 */
public interface CaigouService {
    /**
     * 根据城市名称查找采购总量
     * @param city 城市名称
     * @return
     */
    List<Caigou> getListByCity(Caigou caigou);

    double getCaigou(Caigou caigou);

    //根据年份查询对应的gdp数据
    List<Caigou> getListByYear(Caigou caigou);

    //根据年份查找采购所有信息
    List<Caigou> getAllByYear(Caigou caigou);

    //根据城市名查找采购所有信息
    List <Caigou> getAllByCity(String caigou);

    //根据年份和城市名查找采购所有信息
    List <Caigou> getAllByYearAndCity(Caigou caigou);

    //根据采购类型查找采购信息
    List <Caigou> getListByItemType(String itemType);

}
