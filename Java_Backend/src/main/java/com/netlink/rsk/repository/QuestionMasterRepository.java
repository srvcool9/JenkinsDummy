package com.netlink.rsk.repository;

import com.netlink.rsk.mapper.QuestionListMapper;
import com.netlink.rsk.mapper.StateLevelEnumerator;
import com.netlink.rsk.model.QuestionMaster;
import com.netlink.rsk.model.QuizMaster;
import com.netlink.rsk.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface QuestionMasterRepository extends JpaRepository<QuestionMaster, Long>, JpaSpecificationExecutor<QuestionMaster> {

    public List<QuestionMaster> findByQuizId(QuizMaster quiz);
    public List<QuestionMaster> findAllByQuizIdIn(List<QuizMaster> quizMasterList);

    @Transactional
    @Procedure("dbo.up_GetQuestionList")
    List<QuestionListMapper> getUpGetQuestionList(@Param("QuizTypeId")Long quizTypeId,@Param("TrainingId")Long trainingId,
                                                  @Param("Day")Integer day);

}