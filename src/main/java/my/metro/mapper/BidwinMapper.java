package my.metro.mapper;
import my.metro.entities.Bidwin;

import java.util.List;

/**
 * Created by hk on 2018/8/14.
 */
public interface BidwinMapper {


    //根据年份查找中标所有信息
    public List <Bidwin> getAllByYear(Bidwin bidwin);

    //根据城市名查找中标所有信息
    public List <Bidwin> getAllByCity(String city);

    //根据年份和城市名查找中标所有信息
    public List <Bidwin> getAllByYearAndCity(Bidwin bidwin);

    //根据中标公司查找所有中标信息
    public List <Bidwin> getAllByCompany(String WinbidCompany);

    //根据年份城市单位名查询所有中标信息
    public List <Bidwin> getAllByYearCityCompany(Bidwin bidwin);

    //根据年份单位名查询所有中标信息
    public List <Bidwin> getAllByYearAndCompany(Bidwin bidwin);

    //根据城市单位名查询所有中标信息
    public List <Bidwin> getAllByCityAndCompany(Bidwin bidwin);

    //根据年份单位名查询同类型设计机构在每个市的中标总金额
    public List <Bidwin> getSumByCompanyYear(Bidwin bidwin);

    //根据年份城市名查询同类型设计机构在每个市的中标总金额
    public List <Bidwin> getSumByYearCity(Bidwin bidwin);

}
