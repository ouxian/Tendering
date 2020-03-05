package my.metro.service;

import my.metro.entities.Bidwin;
import my.metro.entities.Caigou;

import java.util.List;

/**
 * Created by hk on 2018/8/14.
 */
public interface BidwinService {

    //根据单位名称查询对应的中标信息
    List<Bidwin> getAllByCompany(String WinbidCompany);

    //根据年份查找中标所有信息
    List<Bidwin> getAllByYear(Bidwin bidwin);

    //根据城市名查找中标所有信息
    List <Bidwin> getAllByCity(String city);

    //根据年份和城市名查找中标所有信息
    List <Bidwin> getAllByYearAndCity(Bidwin bidwin);

    //根据年份、城市名和公司查找中标所有信息
    List <Bidwin> getAllByYearCityCompany(Bidwin bidwin);

    //根据年份、公司名查找所有中标信息
    List <Bidwin> getAllByYearAndCompany(Bidwin bidwin);

    //根据城市名、公司名查找所有中标信息
    List <Bidwin> getAllByCityAndCompany(Bidwin bidwin);

    //根据年份单位名查询同类型设计机构在每个市的中标总金额
    List <Bidwin> getSumByCompanyYear(Bidwin bidwin);

    //根据年份城市名查询同类型设计机构在每个市的中标总金额
    List <Bidwin> getSumByYearCity(Bidwin bidwin);


}
