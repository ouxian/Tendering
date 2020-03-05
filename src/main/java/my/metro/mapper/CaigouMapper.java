package my.metro.mapper;

import my.metro.entities.Caigou;

import java.util.List;

/**
 * Created by hk on 2018/8/14.
 */
public interface CaigouMapper {

    public double getCaigou(Caigou caigou);

    //根据年份查找采购所有信息
    public List <Caigou> getAllByYear(Caigou caigou);

    //根据城市名查找采购所有信息
    public List <Caigou> getAllByCity(String caigou);

    //根据年份和城市名查找采购所有信息
    public List <Caigou> getAllByYearAndCity(Caigou caigou);

    //根据年份查采购总额
    public List<Caigou> getListByYear(Caigou caigou);

    //根据城市名查采购总额
    public List<Caigou> getListByCity(Caigou caigou);

    //根据采购类型查找采购信息
    public List <Caigou> getListByItemType(String itemType);

}
